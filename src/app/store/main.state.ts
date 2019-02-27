import { UserState } from "@app/store/user/user.state";
import { CompanyState } from "@app/store/company/company.state";
import { COMPANY_FEATURE_NAME } from "@app/store/company/company-feature-name";
import { USER_FEATURE_NAME } from "@app/store/user/user-feature-name";

export interface MainState {
  [USER_FEATURE_NAME]: UserState;
  [COMPANY_FEATURE_NAME]: CompanyState;
}
