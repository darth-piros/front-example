import { SelectorFunction } from "@app/models/selector-function";
import { Observable } from "rxjs";
import { MainState } from "@app/store/main.state";
import { companySelector } from "@app/store/company/company.selector";
import { select } from "@ngrx/store";

export function currentCompanyIdSelector(): SelectorFunction<string> {
  return (source$: Observable<MainState>): Observable<string> => source$.pipe(
    companySelector(),
    select(state => state ? state.currentCompanyId : null)
  );
}
