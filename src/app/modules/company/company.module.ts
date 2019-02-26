import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CompanyRoutingModule } from "@app/modules/company/company-routing.module";
import { EditComponent } from "@app/modules/company/components/edit/edit.component";
import { ListComponent } from "@app/modules/company/components/list/list.component";
import { StoreModule } from "@ngrx/store";
import { COMPANY_FEATURE_NAME } from "@app/store/company/company-feature-name";
import { companyReducer } from "@app/store/company/company.reducer";
import { EffectsModule } from "@ngrx/effects";
import { CompanyEditEffect } from "@app/store/company/edit/company-edit.effect";
import { CompanyListEffect } from "@app/store/company/list/company-list.effect";
import { MaterialCompositionModule } from "@app/modules/material-composition/material-composition.module";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [EditComponent, ListComponent],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    FormsModule,
    MaterialCompositionModule,
    StoreModule.forFeature(COMPANY_FEATURE_NAME, companyReducer),
    EffectsModule.forFeature([
      CompanyEditEffect,
      CompanyListEffect
    ])
  ],
  entryComponents: [
    EditComponent
  ]
})
export class CompanyModule { }
