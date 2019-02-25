import { User } from "@app/models/user";

export interface UserListState {
  loading: boolean;
  items: User[];
}
