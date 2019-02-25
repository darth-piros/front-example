import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "@app/app-routing.module";
import { AppComponent } from "@app/app.component";
import { Context, contextFactory } from "@app/in-memory-db";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
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
