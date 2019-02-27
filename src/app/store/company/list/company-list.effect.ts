import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { CompanyService } from "@app/modules/company/services/company.service";
import { Observable } from "rxjs";
import { Action } from "@ngrx/store";
import * as fromCompanyList from "@app/store/company/list/company-list.actions";
import { filter, map, mapTo, switchMap, tap } from "rxjs/operators";
import { MatSnackBar } from "@angular/material";

@Injectable()
export class CompanyListEffect {

  constructor(
    private _actions$: Actions,
    private _companyService: CompanyService,
    private _snackBar: MatSnackBar
  ) {}

  @Effect()
  load$: Observable<Action> = this._actions$.pipe(
    ofType<fromCompanyList.Load>(fromCompanyList.ActionTypes.LOAD),
    switchMap(() =>
      this._companyService
        .getAll()
        .pipe(
          map(data => new fromCompanyList.Loaded(data))
        )
    )
  );

  @Effect()
  delete$: Observable<Action> = this._actions$.pipe(
    ofType<fromCompanyList.Delete>(fromCompanyList.ActionTypes.DELETE),
    switchMap(action =>
      this._companyService
        .delete(action.payload)
        .pipe(
          filter(result => result),
          tap(() => this._snackBar.open("Company is deleted", null, {duration: 2000})),
          mapTo(new fromCompanyList.Deleted(action.payload))
        )
    )
  );

}
