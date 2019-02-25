import { User } from "@app/models/user";
import { UserEditState } from "@app/store/user/edit/user-edit.state";

export interface UserState {
  list: User[];
  edit: UserEditState;
}
