import { HandlersDictionary } from "@app/models/handlers-dictionary";
import { CompanyListState } from "@app/store/company/list/company-list.state";
import * as fromCompanyList from "@app/store/company/list/company-list.actions";
import { Action } from "@ngrx/store";
import { genericReducer } from "@app/store/generic.reducer";
import * as fromCompanyEdit from "@app/store/company/edit/company-edit.actions";

function defaultFactory(): CompanyListState {
  return {
    loading: false,
    items: []
  };
}

const handlers: HandlersDictionary<CompanyListState> = {};

handlers[fromCompanyList.ActionTypes.LOAD] = function(
  state: CompanyListState,
  action: fromCompanyList.Load
): CompanyListState {
  return {
    ...state,
    loading: true
  };
};

handlers[fromCompanyList.ActionTypes.LOADED] = function(
  state: CompanyListState,
  action: fromCompanyList.Loaded
): CompanyListState {
  return {
    ...state,
    items: action.payload,
    loading: false
  };
};

handlers[fromCompanyList.ActionTypes.DELETED] = function(
  state: CompanyListState,
  action: fromCompanyList.Deleted
): CompanyListState {
  return {
    ...state,
    items: state.items.filter(a => a.id !== action.payload)
  };
};

handlers[fromCompanyList.ActionTypes.CLEAR] = function(
  state: CompanyListState,
  action: fromCompanyList.Clear
): CompanyListState {
  return defaultFactory();
};

handlers[fromCompanyEdit.ActionTypes.SAVED] = function(
  state: CompanyListState,
  action: fromCompanyEdit.Saved
): CompanyListState {
  const index = state.items.findIndex(a => a.id === action.payload.id);
  if (index >= 0) {
    return {
      ...state,
      items: [
        ...state.items.slice(0, index),
        action.payload,
        ...state.items.slice(index + 1)
      ]
    };
  }

  return {
    ...state,
    items: [
      ...state.items,
      action.payload
    ]
  };
}

export function companyListReducer(state: CompanyListState = defaultFactory(), action: Action): CompanyListState {
  return genericReducer(handlers, state, action);
}
