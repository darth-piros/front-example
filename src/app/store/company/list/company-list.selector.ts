import { SelectorFunction } from "@app/models/selector-function";
import { CompanyListState } from "@app/store/company/list/company-list.state";
import { Observable } from "rxjs";
import { MainState } from "@app/store/main.state";
import { companySelector } from "@app/store/company/company.selector";
import { select } from "@ngrx/store";

export function companyListSelector(): SelectorFunction<CompanyListState> {
  return (source$: Observable<MainState>): Observable<CompanyListState> => source$.pipe(
    companySelector(),
    select(state => state ? state.list : null)
  );
}
