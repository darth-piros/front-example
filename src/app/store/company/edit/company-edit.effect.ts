import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { CompanyService } from "@app/modules/company/services/company.service";
import { merge, Observable } from "rxjs";
import { Action, Store } from "@ngrx/store";
import * as fromCompanyEdit from "@app/store/company/edit/company-edit.actions";
import { filter, map, mapTo, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { MatDialog, MatSnackBar } from "@angular/material";
import { EditComponent } from "@app/modules/company/components/edit/edit.component";
import { MainState } from "@app/store/main.state";
import { companyEditDialogRefSelector, companyEditItemSelector } from "@app/store/company/edit/company-edit.selector";

@Injectable()
export class CompanyEditEffect {

  constructor(
    private _actions$: Actions,
    private _companyService: CompanyService,
    private _matDialog: MatDialog,
    private _store: Store<MainState>,
    private _snackBar: MatSnackBar
  ) {}

  @Effect()
  load$: Observable<Action> = this._actions$.pipe(
    ofType<fromCompanyEdit.Edit>(fromCompanyEdit.ActionTypes.EDIT),
    switchMap(action => {
      const dialogRef = this._matDialog.open(EditComponent);

      return merge(
        dialogRef
          .afterOpened()
          .pipe(
            switchMap(() => this._companyService.getById(action.payload)),
            map(data => new fromCompanyEdit.Loaded({company: data, dialogRef}))
          ),
        dialogRef
          .afterClosed()
          .pipe(
            filter(result => result == null),
            mapTo(new fromCompanyEdit.Cancel())
          )
      );
    })
  );

  @Effect()
  cancel$ = this._actions$.pipe(
    ofType<fromCompanyEdit.Cancel>(fromCompanyEdit.ActionTypes.CANCEL),
    withLatestFrom(
      this._store.pipe(companyEditDialogRefSelector())
    ),
    tap(([action, dialogRef]) => dialogRef.close()),
    mapTo(new fromCompanyEdit.Canceled())
  );

  @Effect()
  save$: Observable<Action> = this._actions$.pipe(
    ofType<fromCompanyEdit.Save>(fromCompanyEdit.ActionTypes.SAVE),
    withLatestFrom(
      this._store.pipe(companyEditItemSelector())
    ),
    switchMap(([action, item]) =>
      this._companyService
        .save(item)
        .pipe(
          withLatestFrom(
            this._store.pipe(companyEditDialogRefSelector())
          ),
          tap(([company, dialogRef]) => dialogRef.close(company)),
          tap(() => this._snackBar.open("Company is saved", null, {duration: 2000})),
          map(([data]) => new fromCompanyEdit.Saved(data))
        )
    )
  );

}
