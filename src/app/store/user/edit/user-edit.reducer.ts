import { UserEditState } from "@app/store/user/edit/user-edit.state";
import { HandlersDictionary } from "@app/models/handlers-dictionary";
import * as fromUserEdit from "@app/store/user/edit/user-edit.actions";
import { Action } from "@ngrx/store";
import { genericReducer } from "@app/store/generic.reducer";


function defaultFactory(): UserEditState {
  return {
    loading: false,
    item: null,
    dialogRef: null
  };
}

const handlers: HandlersDictionary<UserEditState> = {};

handlers[fromUserEdit.ActionTypes.EDIT] = function(
  state: UserEditState,
  action: fromUserEdit.Edit
): UserEditState {
  return {
    ...state,
    loading: true
  };
};

handlers[fromUserEdit.ActionTypes.LOADED] = function(
  state: UserEditState,
  action: fromUserEdit.Loaded
): UserEditState {
  return {
    ...state,
    loading: false,
    item: action.payload.user,
    dialogRef: action.payload.dialogRef
  };
};

handlers[fromUserEdit.ActionTypes.SAVE] = function(
  state: UserEditState,
  action: fromUserEdit.Save
): UserEditState {
  return {
    ...state,
    loading: true
  };
};

handlers[fromUserEdit.ActionTypes.CANCELED] = function(
  state: UserEditState,
  action: fromUserEdit.Canceled
): UserEditState {
  return defaultFactory();
};

handlers[fromUserEdit.ActionTypes.SAVED] = function(
  state: UserEditState,
  action: fromUserEdit.Saved
): UserEditState {
  return defaultFactory();
}

export function userEditReducer(state: UserEditState = defaultFactory(), action: Action): UserEditState {
  return genericReducer(handlers, state, action);
}
