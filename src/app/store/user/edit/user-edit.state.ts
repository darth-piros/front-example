import { User } from "@app/models/user";
import { MatDialogRef } from "@angular/material";

export interface UserEditState {
  loading: boolean;
  item: User;
  dialogRef: MatDialogRef<any>;
}
