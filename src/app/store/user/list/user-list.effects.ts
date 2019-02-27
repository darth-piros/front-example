import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { MatSnackBar } from "@angular/material";
import { Observable } from "rxjs";
import { Action, Store } from "@ngrx/store";
import { filter, map, mapTo, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { UserService } from "@app/modules/user/services/user.service";
import * as fromUserList from "@app/store/user/list/user-list.actions";
import { MainState } from "@app/store/main.state";
import { currentCompanyIdSelector } from "@app/store/company/current-company-id/current-company-id.selector";

@Injectable()
export class UserListEffects {

  constructor(
    private _actions$: Actions,
    private _userService: UserService,
    private _snackBar: MatSnackBar,
    private _store: Store<MainState>
  ) {}

  @Effect()
  load$: Observable<Action> = this._actions$.pipe(
    ofType<fromUserList.Load>(fromUserList.ActionTypes.LOAD),
    withLatestFrom(
      this._store.pipe(currentCompanyIdSelector())
    ),
    switchMap(([action, companyId]) =>
      this._userService
        .getByCompanyId(companyId)
        .pipe(
          map(data => new fromUserList.Loaded(data))
        )
    )
  );

  @Effect()
  delete$: Observable<Action> = this._actions$.pipe(
    ofType<fromUserList.Delete>(fromUserList.ActionTypes.DELETE),
    switchMap(action =>
      this._userService
        .delete(action.payload)
        .pipe(
          filter(result => result),
          tap(() => this._snackBar.open("User is deleted", null, {duration: 2000})),
          mapTo(new fromUserList.Deleted(action.payload))
        )
    )
  );

}
