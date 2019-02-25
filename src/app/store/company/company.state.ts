import { CompanyListState } from "@app/store/company/list/company-list.state";
import { CompanyEditState } from "@app/store/company/edit/company-edit.state";


export interface CompanyState {
  list: CompanyListState;
  edit: CompanyEditState;
  currentCompanyId: string;
}
