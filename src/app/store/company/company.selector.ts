import { SelectorFunction } from "@app/models/selector-function";
import { CompanyState } from "@app/store/company/company.state";
import { Observable } from "rxjs";
import { MainState } from "@app/store/main.state";
import { select } from "@ngrx/store";
import { COMPANY_FEATURE_NAME } from "@app/store/company/company-feature-name";

export function companySelector(): SelectorFunction<CompanyState> {
  return (source$: Observable<MainState>): Observable<CompanyState> => source$.pipe(
    select(state => state ? state[COMPANY_FEATURE_NAME] : null)
  );
}
