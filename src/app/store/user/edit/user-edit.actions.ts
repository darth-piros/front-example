import { Action } from "@ngrx/store";
import { MatDialogRef } from "@angular/material";
import { User } from "@app/models/user";

export enum ActionTypes {
  CREATE = "[user.edit] CREATE",
  EDIT = "[user.edit] Edit",
  LOADED = "[user.edit] Loaded",
  CANCEL = "[user.edit] Cancel",
  CANCELED = "[user.edit] Canceled",
  SAVE = "[user.edit] Save",
  SAVED = "[user.edit] Saved",
}

export class Create implements Action {
  readonly type = ActionTypes.CREATE;
}

export class Edit implements Action {
  readonly type = ActionTypes.EDIT;

  constructor(
    public payload: number
  ) {}
}

export class Loaded implements Action {
  readonly type = ActionTypes.LOADED;

  constructor(
    public payload: {
      user: User;
      dialogRef: MatDialogRef<any>
    }
  ) {}
}

export class Cancel implements Action {
  readonly type = ActionTypes.CANCEL;
}

export class Canceled implements Action {
  readonly type = ActionTypes.CANCELED;
}

export class Save implements Action {
  readonly type = ActionTypes.SAVE;
}

export class Saved implements Action {
  readonly type = ActionTypes.SAVED;

  constructor(
    public payload: User
  ) {}
}
