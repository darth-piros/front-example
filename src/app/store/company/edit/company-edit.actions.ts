import { Action } from "@ngrx/store";
import { Company } from "@app/models/company";
import { MatDialogRef } from "@angular/material";

export enum ActionTypes {
  EDIT = "[company.edit] Load",
  LOADED = "[company.edit] Loaded",
  CANCEL = "[company.edit] Cancel",
  CANCELED = "[company.edit] Canceled",
  SAVE = "[company.edit] Save",
  SAVED = "[company.edit] Saved",
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
      company: Company;
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
    public payload: Company
  ) {}
}
