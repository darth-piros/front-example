import { HandlersDictionary } from "@app/models/handlers-dictionary";
import { CompanyEditState } from "@app/store/company/edit/company-edit.state";
import * as fromCompanyEdit from "@app/store/company/edit/company-edit.actions";
import { Action } from "@ngrx/store";
import { genericReducer } from "@app/store/generic.reducer";

function defaultFactory(): CompanyEditState {
  return {
    loading: false,
    item: null,
    dialogRef: null
  };
}

const handlers: HandlersDictionary<CompanyEditState> = {};

handlers[fromCompanyEdit.ActionTypes.EDIT] = function(
  state: CompanyEditState,
  action: fromCompanyEdit.Edit
): CompanyEditState {
  return {
    ...state,
    loading: true
  };
};

handlers[fromCompanyEdit.ActionTypes.LOADED] = function(
  state: CompanyEditState,
  action: fromCompanyEdit.Loaded
): CompanyEditState {
  return {
    ...state,
    loading: false,
    item: action.payload.company,
    dialogRef: action.payload.dialogRef
  };
};

handlers[fromCompanyEdit.ActionTypes.SAVE] = function(
  state: CompanyEditState,
  action: fromCompanyEdit.Save
): CompanyEditState {
  return {
    ...state,
    loading: true
  };
};

handlers[fromCompanyEdit.ActionTypes.CANCELED] = function(
  state: CompanyEditState,
  action: fromCompanyEdit.Canceled
): CompanyEditState {
  return defaultFactory();
};

handlers[fromCompanyEdit.ActionTypes.SAVED] = function(
  state: CompanyEditState,
  action: fromCompanyEdit.Saved
): CompanyEditState {
  return defaultFactory();
}

export function companyEditReducer(state: CompanyEditState = defaultFactory(), action: Action): CompanyEditState {
  return genericReducer(handlers, state, action);
}
