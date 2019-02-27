import { UserListState } from "@app/store/user/list/user-list.state";
import { HandlersDictionary } from "@app/models/handlers-dictionary";
import * as fromUserList from "@app/store/user/list/user-list.actions";
import { genericReducer } from "@app/store/generic.reducer";
import { Action } from "@ngrx/store";
import * as fromUserEdit from "@app/store/user/edit/user-edit.actions";


function defaultFactory(): UserListState {
  return {
    loading: false,
    items: []
  };
}

const handlers: HandlersDictionary<UserListState> = {};

handlers[fromUserList.ActionTypes.LOAD] = function(
  state: UserListState,
  action: fromUserList.Load
): UserListState {
  return {
    ...state,
    loading: true
  };
};

handlers[fromUserList.ActionTypes.LOADED] = function(
  state: UserListState,
  action: fromUserList.Loaded
): UserListState {
  return {
    ...state,
    items: action.payload,
    loading: false
  };
};

handlers[fromUserList.ActionTypes.DELETED] = function(
  state: UserListState,
  action: fromUserList.Deleted
): UserListState {
  return {
    ...state,
    items: state.items.filter(a => a.id !== action.payload)
  };
};

handlers[fromUserList.ActionTypes.CLEAR] = function(
  state: UserListState,
  action: fromUserList.Clear
): UserListState {
  return defaultFactory();
};

handlers[fromUserEdit.ActionTypes.SAVED] = function(
  state: UserListState,
  action: fromUserEdit.Saved
): UserListState {
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

export function userListReducer(state: UserListState = defaultFactory(), action: Action): UserListState {
  return genericReducer(handlers, state, action);
}
