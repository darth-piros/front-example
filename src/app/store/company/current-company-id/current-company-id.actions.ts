import { Action } from "@ngrx/store";

export enum ActionTypes {
  SET = "[company.currentCompanyId] Set"
}

export class SetId implements Action {
  readonly type = ActionTypes.SET;

  constructor(
    public payload: number
  ) {}
}
