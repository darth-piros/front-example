import { UserEditState } from "@app/store/user/edit/user-edit.state";
import { UserListState } from "@app/store/user/list/user-list.state";

export interface UserState {
  list: UserListState;
  edit: UserEditState;
}
