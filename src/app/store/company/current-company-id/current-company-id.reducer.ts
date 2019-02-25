import { HandlersDictionary } from "@app/models/handlers-dictionary";
import * as fromCurrentCompanyId from "@app/store/company/current-company-id/current-company-id.actions";
import { Action } from "@ngrx/store";
import { genericReducer } from "@app/store/generic.reducer";

const handlers: HandlersDictionary<string> = {};

handlers[fromCurrentCompanyId.ActionTypes.SET] = function(
  state: string,
  action: fromCurrentCompanyId.SetId
): string {
  return action.payload;
}

export function currentCompanyIdReducer(state: string, action: Action): string {
  return genericReducer(handlers, state, action);
}
