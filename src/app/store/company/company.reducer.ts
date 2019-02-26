import { Action, ActionReducer, combineReducers } from "@ngrx/store";
import { CompanyState } from "@app/store/company/company.state";
import { currentCompanyIdReducer } from "@app/store/company/current-company-id/current-company-id.reducer";
import { companyListReducer } from "@app/store/company/list/company-list.reducer";
import { companyEditReducer } from "@app/store/company/edit/company-edit.reducer";

export const companyReducerMap: ActionReducer<CompanyState> = combineReducers({
  currentCompanyId: currentCompanyIdReducer,
  list: companyListReducer,
  edit: companyEditReducer
});

export function companyReducer(state: CompanyState, action: Action) {
  return companyReducerMap(state, action);
}

