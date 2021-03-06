import { Action } from "@ngrx/store";
import { Company } from "@app/models/company";

export enum ActionTypes {
  LOAD = "[company.list] Load",
  LOADED = "[company.list] Loaded",
  DELETE = "[company.list] Delete",
  DELETED = "[company.list] Deleted",
  CLEAR = "[company.list] Clear",
}

export class Load implements Action {
  readonly type = ActionTypes.LOAD;
}

export class Loaded implements Action {
  readonly type = ActionTypes.LOADED;

  constructor(
    public payload: Company[]
  ) {}
}

export class Delete implements Action {
  readonly type = ActionTypes.DELETE;

  constructor(
    public payload: number
  ) {}
}

export class Deleted implements Action {
  readonly type = ActionTypes.DELETED;

  constructor(
    public payload: number
  ) {}
}

export class Clear implements Action {
  readonly type = ActionTypes.CLEAR;
}
