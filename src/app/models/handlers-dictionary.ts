import { Action } from "@ngrx/store";

export interface HandlersDictionary<T> {
  [key: string]: (state: T, action: Action) => T;
}
