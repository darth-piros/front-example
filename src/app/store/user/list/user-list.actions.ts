import { Action } from "@ngrx/store";
import { User } from "@app/models/user";

export enum ActionTypes {
  LOAD = "[user.list] Load",
  LOADED = "[user.list] Loaded",
  DELETE = "[user.list] Delete",
  DELETED = "[user.list] Deleted",
  CLEAR = "[user.list] Clear",
}

export class Load implements Action {
  readonly type = ActionTypes.LOAD;
}

export class Loaded implements Action {
  readonly type = ActionTypes.LOADED;

  constructor(
    public payload: User[]
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
