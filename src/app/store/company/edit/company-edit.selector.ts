import { SelectorFunction } from "@app/models/selector-function";
import { CompanyEditState } from "@app/store/company/edit/company-edit.state";
import { Observable } from "rxjs";
import { MainState } from "@app/store/main.state";
import { companySelector } from "@app/store/company/company.selector";
import { select } from "@ngrx/store";
import { MatDialogRef } from "@angular/material";
import { Company } from "@app/models/company";

export function companyEditSelector(): SelectorFunction<CompanyEditState> {
  return (source$: Observable<MainState>): Observable<CompanyEditState> => source$.pipe(
    companySelector(),
    select(state => state ? state.edit : null)
  );
}

export function companyEditLoadingSelector(): SelectorFunction<boolean> {
  return (source$: Observable<MainState>): Observable<boolean> => source$.pipe(
    companyEditSelector(),
    select(edit => edit ? edit.loading : false)
  );
}

export function companyEditDialogRefSelector(): SelectorFunction<MatDialogRef<any>> {
  return (source$: Observable<MainState>): Observable<MatDialogRef<any>> => source$.pipe(
    companyEditSelector(),
    select(edit => edit ? edit.dialogRef : null)
  );
}

export function companyEditItemSelector(): SelectorFunction<Company> {
  return (source$: Observable<MainState>): Observable<Company> => source$.pipe(
    companyEditSelector(),
    select(edit => edit ? edit.item : null)
  );
}
