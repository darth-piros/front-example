import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { CompanyService } from "@app/modules/company/services/company.service";
import { Observable } from "rxjs";
import { Action, Store } from "@ngrx/store";
import * as fromCompanyList from "@app/store/company/list/company-list.actions";
import { concatMap, filter, map, mapTo, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { MatSnackBar } from "@angular/material";
import { MainState } from "@app/store/main.state";
import { currentCompanyIdSelector } from "@app/store/company/current-company-id/current-company-id.selector";
import { SetId } from "@app/store/company/current-company-id/current-company-id.actions";

@Injectable()
export class CompanyListEffect {

  constructor(
    private _actions$: Actions,
    private _companyService: CompanyService,
    private _snackBar: MatSnackBar,
    private _store: Store<MainState>
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
          withLatestFrom(
            this._store.pipe(currentCompanyIdSelector()),
          ),
          tap(() => this._snackBar.open("Company is deleted", null, {duration: 2000})),
          concatMap(([newCurrent, currentId]) => {
            const result: Action[] = [new fromCompanyList.Deleted(action.payload)];
            if (currentId === action.payload && newCurrent >= 0) {
              result.push(new SetId(newCurrent));
            }

            return result;
          })
        )
    )
  );

}
