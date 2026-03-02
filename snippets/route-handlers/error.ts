import { createError } from "h3";

export type ErrorPayload = {
  /**
   * Specific error name
   */
  error?: string;

  /**
   * Human-readable error message
   */
  message?: string;

  /**
   * Additional error details
   */
  detail?: unknown;
};

/**
 * Domain errors
 */

export function createValidationError({
  error = "invalid",
  message = "Invalid data",
  detail,
}: ErrorPayload = {}) {
  return createUnprocessableEntityError({
    error,
    message,
    detail,
  });
}

export function createAuthFlowConflictError(message: string) {
  return createConflictError({
    error: "auth_flow_conflict",
    message,
  });
}

export function createAuthCodeValidationError(message: string) {
  return createBadRequestError({
    error: "auth_code_validation_error",
    message,
  });
}

/**
 * HTTP status codes
 */

export function createBadRequestError(payload: ErrorPayload = {}) {
  return createAppError({
    status: 400,
    statusText: "Bad Request",
    payload,
  });
}

export function createUnauthorizedError(payload: ErrorPayload = {}) {
  return createAppError({
    status: 401,
    statusText: "Unauthorized",
    payload,
  });
}

export function createForbiddenError(payload: ErrorPayload = {}) {
  return createAppError({
    status: 403,
    statusText: "Forbidden",
    payload,
  });
}

export function createNotFoundError({
  error = "not_found",
  message = "Entry does not exist",
  detail,
}: ErrorPayload = {}) {
  return createAppError({
    status: 404,
    statusText: "Not Found",
    payload: {
      error,
      message,
      detail,
    },
  });
}

export function createConflictError(payload: ErrorPayload = {}) {
  return createAppError({
    status: 409,
    statusText: "Conflict",
    payload,
  });
}

export function createPayloadTooLargeError(payload: ErrorPayload = {}) {
  return createAppError({
    status: 413,
    statusText: "Payload Too Large",
    payload,
  });
}

export function createUnprocessableEntityError(payload: ErrorPayload = {}) {
  return createAppError({
    status: 422,
    statusText: "Unprocessable Entity",
    payload,
  });
}

export function createInternalServerError(payload: ErrorPayload = {}) {
  return createAppError({
    status: 500,
    statusText: "Internal Server Error",
    payload,
  });
}

/**
 * This is a generic error creator enforcing the error payload structure.
 */
export function createAppError({
  status = 500,
  statusText = "Internal Server Error",
  payload,
}: {
  status: number;
  statusText?: string;
  payload?: ErrorPayload;
}) {
  return createError({
    status,
    statusText,
    data: payload,
  });
}
