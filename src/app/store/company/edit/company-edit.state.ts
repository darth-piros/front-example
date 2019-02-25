import { Company } from "@app/models/company";
import { MatDialogRef } from "@angular/material";

export interface CompanyEditState {
  loading: boolean;
  item: Company;
  dialogRef: MatDialogRef<any>;
}
