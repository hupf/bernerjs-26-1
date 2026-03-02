import {
  EventHandlerRequest,
  EventHandlerResponse,
  H3Event,
  H3EventContext,
  defineEventHandler,
  getQuery,
  getRouterParams,
  readBody,
  readFormData,
} from "h3";
import z from "zod";
import { createValidationError } from "./error.ts";
import { AppEvent } from "./nitro.ts";

export interface Validations<
  TBody extends z.ZodType | undefined = undefined,
  TFormData extends z.ZodType | undefined = undefined,
  TQuery extends z.ZodType | undefined = undefined,
  TParams extends z.ZodType | undefined = undefined,
> {
  body?: TBody;
  formData?: TFormData;
  query?: TQuery;
  params?: TParams;
}

export interface ValidationResult<
  TBody extends z.ZodType | undefined = undefined,
  TFormData extends z.ZodType | undefined = undefined,
  TQuery extends z.ZodType | undefined = undefined,
  TParams extends z.ZodType | undefined = undefined,
> {
  body: TBody extends z.ZodType ? z.output<TBody> : undefined;
  formData: TFormData extends z.ZodType ? z.output<TFormData> : undefined;
  query: TQuery extends z.ZodType ? z.output<TQuery> : undefined;
  params: TParams extends z.ZodType ? z.output<TParams> : undefined;
}

export interface ValidationError {
  body?: z.ZodError;
  formData?: z.ZodError;
  query?: z.ZodError;
  params?: z.ZodError;
}

export type ValidatedContext<
  TBody extends z.ZodType | undefined = undefined,
  TFormData extends z.ZodType | undefined = undefined,
  TQuery extends z.ZodType | undefined = undefined,
  TParams extends z.ZodType | undefined = undefined,
  TContext extends H3EventContext = H3EventContext,
> = TContext & {
  validated: ValidationResult<TBody, TFormData, TQuery, TParams>;
};

export function defineValidatedEventHandler<
  TBody extends z.ZodType | undefined = undefined,
  TFormData extends z.ZodType | undefined = undefined,
  TQuery extends z.ZodType | undefined = undefined,
  TParams extends z.ZodType | undefined = undefined,
  TEventHandlerRequest extends EventHandlerRequest = EventHandlerRequest,
  TEventHandlerResponse extends EventHandlerResponse = EventHandlerResponse,
  TSourceContext extends H3EventContext = H3EventContext,
  TValidatedContext extends H3EventContext = ValidatedContext<
    TBody,
    TFormData,
    TQuery,
    TParams,
    TSourceContext
  >,
  TValidatedEvent extends H3Event<TEventHandlerRequest> = AppEvent<
    TValidatedContext,
    TEventHandlerRequest
  >,
>(
  validate: Validations<TBody, TFormData, TQuery, TParams> = {},
  handler: (event: TValidatedEvent) => TEventHandlerResponse,
) {
  return defineEventHandler(async (event) => {
    const errors: ValidationError = {};
    const result: Partial<ValidationResult<TBody, TFormData, TQuery, TParams>> =
      {};

    if (validate.body) {
      const body = await readBody(event);
      const bodyResult = await validate.body.safeParseAsync(body);
      if (!bodyResult.success) {
        errors.body = bodyResult.error;
      } else {
        result.body = bodyResult.data as TBody extends z.ZodType
          ? z.output<TBody>
          : undefined;
      }
    }

    if (validate.formData) {
      type FormDataValue = string | File;
      type FormDataEntry = [string, FormDataValue];
      const formData = await readFormData(event);
      const entries = Array.from(formData.entries()) as FormDataEntry[];
      const formDataObj = entries.reduce<Record<string, FormDataValue>>(
        (acc, [key, value]) => {
          acc[key] = value;
          return acc;
        },
        {},
      );
      const formDataResult =
        await validate.formData.safeParseAsync(formDataObj);
      if (!formDataResult.success) {
        errors.formData = formDataResult.error;
      } else {
        result.formData = formDataResult.data as TFormData extends z.ZodType
          ? z.output<TFormData>
          : undefined;
      }
    }

    if (validate.query) {
      const query = getQuery(event);
      const queryResult = await validate.query.safeParseAsync(query);
      if (!queryResult.success) {
        errors.query = queryResult.error;
      } else {
        result.query = queryResult.data as TQuery extends z.ZodType
          ? z.output<TQuery>
          : undefined;
      }
    }

    if (validate.params) {
      const params = getRouterParams(event);
      const paramsResult = await validate.params.safeParseAsync(params);
      if (!paramsResult.success) {
        errors.params = paramsResult.error;
      } else {
        result.params = paramsResult.data as TParams extends z.ZodType
          ? z.output<TParams>
          : undefined;
      }
    }

    if (Object.values(errors).some(Boolean)) {
      throw createValidatedError(event, errors);
    }

    const validatedEvent = event as TValidatedEvent;
    validatedEvent.context.validated = result as ValidationResult<
      TBody,
      TFormData,
      TQuery,
      TParams
    >;
    return handler(validatedEvent);
  });
}

function createValidatedError<TEventHandlerRequest extends EventHandlerRequest>(
  event: H3Event<TEventHandlerRequest>,
  errors: ValidationError,
) {
  return createValidationError({ detail: formatErrors(errors) });
}

function formatErrors(errors: ValidationError) {
  return {
    body: errors.body && z.treeifyError(errors.body),
    formData: errors.formData && z.treeifyError(errors.formData),
    query: errors.query && z.treeifyError(errors.query),
    params: errors.params && z.treeifyError(errors.params),
  };
}
