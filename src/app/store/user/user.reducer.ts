import { Action, ActionReducer, combineReducers } from "@ngrx/store";
import { UserState } from "@app/store/user/user.state";
import { userListReducer } from "@app/store/user/list/user-list.reducer";
import { userEditReducer } from "@app/store/user/edit/user-edit.reducer";

export const userReducerMap: ActionReducer<UserState> = combineReducers({
  list: userListReducer,
  edit: userEditReducer
});

export function userReducer(state: UserState, action: Action) {
  return userReducerMap(state, action);
}
