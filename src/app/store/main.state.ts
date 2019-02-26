import { UserState } from "@app/store/user/user.state";
import { CompanyState } from "@app/store/company/company.state";
import { COMPANY_FEATURE_NAME } from "@app/store/company/company-feature-name";

export interface MainState {
  user: UserState;
  [COMPANY_FEATURE_NAME]: CompanyState;
}
