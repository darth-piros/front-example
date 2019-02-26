import { Action } from "@ngrx/store";
import { Company } from "@app/models/company";

export enum ActionTypes {
  LOAD = "[company.list] Load",
  LOADED = "[company.list] Loaded",
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
