import { EventHandlerRequest, H3Event, H3EventContext } from "h3";

export interface AppEvent<
  TContext extends H3EventContext = H3EventContext,
  TEventHandlerRequest extends EventHandlerRequest = EventHandlerRequest,
> extends H3Event<TEventHandlerRequest> {
  context: TContext;
}
