import { Company } from "@app/models/company";

export interface CompanyListState {
  loading: boolean;
  items: Company[];
}
