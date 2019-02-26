import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "@app/app-routing.module";
import { AppComponent } from "@app/app.component";
import { Context, contextFactory } from "@app/in-memory-db";
import { MaterialCompositionModule } from "@app/modules/material-composition/material-composition.module";
import { CompanyModule } from "@app/modules/company/company.module";
import { ActionReducer, StoreModule } from "@ngrx/store";
import { routerReducer, StoreRouterConnectingModule } from "@ngrx/router-store";
import { EffectsModule } from "@ngrx/effects";
import { MainState } from "@app/store/main.state";
import { storeLogger } from "ngrx-store-logger";
import { FormsModule } from "@angular/forms";

export function logger(reducer: ActionReducer<MainState>) {
  return storeLogger()(reducer);
}

export const metaReducers = [logger];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ router: routerReducer }, { metaReducers }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),

    MaterialCompositionModule,

    CompanyModule
  ],
  providers: [
    {
      provide: Context,
      useFactory: contextFactory
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
