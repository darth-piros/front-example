import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CompanyRoutingModule } from "@app/modules/company/company-routing.module";
import { EditComponent } from "./components/edit/edit.component";

@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    CompanyRoutingModule
  ],
  entryComponents: [
    EditComponent
  ]
})
export class CompanyModule { }
