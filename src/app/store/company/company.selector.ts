import { SelectorFunction } from "@app/models/selector-function";
import { CompanyState } from "@app/store/company/company.state";
import { Observable } from "rxjs";
import { MainState } from "@app/store/main.state";
import { select } from "@ngrx/store";

export function companySelector(): SelectorFunction<CompanyState> {
  return (source$: Observable<MainState>): Observable<CompanyState> => source$.pipe(
    select(state => state ? state.company : null)
  );
}
