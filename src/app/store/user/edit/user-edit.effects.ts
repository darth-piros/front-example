import { UserService } from "@app/modules/user/services/user.service";
import { MainState } from "@app/store/main.state";
import { MatDialog, MatSnackBar } from "@angular/material";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { Action, Store } from "@ngrx/store";
import { merge, Observable } from "rxjs";
import * as fromUserEdit from "@app/store/user/edit/user-edit.actions";
import { filter, map, mapTo, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { EditComponent } from "@app/modules/user/components/edit/edit.component";
import { userEditDialogRefSelector, userEditItemSelector } from "@app/store/user/edit/user-edit.selector";

@Injectable()
export class UserEditEffects {

  constructor(
    private _actions$: Actions,
    private _userService: UserService,
    private _matDialog: MatDialog,
    private _store: Store<MainState>,
    private _snackBar: MatSnackBar
  ) {
  }

  @Effect()
  load$: Observable<Action> = this._actions$.pipe(
    ofType<fromUserEdit.Edit>(fromUserEdit.ActionTypes.EDIT),
    switchMap(action => {
      const dialogRef = this._matDialog.open(EditComponent);

      return merge(
        dialogRef
          .afterOpened()
          .pipe(
            switchMap(() => this._userService.getById(action.payload)),
            map(data => new fromUserEdit.Loaded({user: data, dialogRef}))
          ),
        dialogRef
          .afterClosed()
          .pipe(
            filter(result => result == null),
            mapTo(new fromUserEdit.Cancel())
          )
      );
    })
  );

  @Effect()
  cancel$ = this._actions$.pipe(
    ofType<fromUserEdit.Cancel>(fromUserEdit.ActionTypes.CANCEL),
    withLatestFrom(
      this._store.pipe(userEditDialogRefSelector())
    ),
    tap(([action, dialogRef]) => dialogRef.close()),
    mapTo(new fromUserEdit.Canceled())
  );

  @Effect()
  save$: Observable<Action> = this._actions$.pipe(
    ofType<fromUserEdit.Save>(fromUserEdit.ActionTypes.SAVE),
    withLatestFrom(
      this._store.pipe(userEditItemSelector())
    ),
    switchMap(([action, item]) =>
      this._userService
        .save(item)
        .pipe(
          withLatestFrom(
            this._store.pipe(userEditDialogRefSelector())
          ),
          tap(([company, dialogRef]) => dialogRef.close(company)),
          tap(() => this._snackBar.open("User is saved", null, {duration: 2000})),
          map(([data]) => new fromUserEdit.Saved(data))
        )
    )
  );
}
