import { User } from "@app/models/user";

export interface UserEditState {
  loading: boolean;
  item: User;
}
