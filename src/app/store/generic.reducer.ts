import { HandlersDictionary } from "@app/models/handlers-dictionary";
import { Action } from "@ngrx/store";

export function genericReducer<T>(handlers: HandlersDictionary<T>, state: T, action: Action) {
  if (handlers[action.type]) {
    return handlers[action.type](state, action);
  }
  return state;
}
