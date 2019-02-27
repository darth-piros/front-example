import { HandlersDictionary } from "@app/models/handlers-dictionary";
import * as fromCurrentCompanyId from "@app/store/company/current-company-id/current-company-id.actions";
import { Action } from "@ngrx/store";
import { genericReducer } from "@app/store/generic.reducer";

const handlers: HandlersDictionary<number> = {};

handlers[fromCurrentCompanyId.ActionTypes.SET] = function(
  state: number,
  action: fromCurrentCompanyId.SetId
): number {
  return action.payload;
}

export function currentCompanyIdReducer(state: number = 0, action: Action): number {
  return genericReducer(handlers, state, action);
}
