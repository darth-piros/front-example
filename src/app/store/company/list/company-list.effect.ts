import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { CompanyService } from "@app/modules/company/services/company.service";
import { Observable } from "rxjs";
import { Action } from "@ngrx/store";
import * as fromCompanyList from "@app/store/company/list/company-list.actions";
import { map, switchMap } from "rxjs/operators";

@Injectable()
export class CompanyListEffect {

  constructor(
    private _actions$: Actions,
    private _companyService: CompanyService
  ) {}

  @Effect()
  load$: Observable<Action> = this._actions$.pipe(
    ofType<fromCompanyList.Load>(fromCompanyList.ActionTypes.LOAD),
    switchMap(() =>
      this._companyService
        .getCompanies()
        .pipe(
          map(data => new fromCompanyList.Loaded(data))
        )
    )
  );

}
