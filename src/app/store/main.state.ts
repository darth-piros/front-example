import { UserState } from "@app/store/user/user.state";
import { CompanyState } from "@app/store/company/company.state";

export interface MainState {
  user: UserState;
  company: CompanyState;
}
