import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Context } from "@app/in-memory-db";
import { Observable } from "rxjs";
import { Company } from "@app/models/company";
import { Store } from "@ngrx/store";
import { MainState } from "@app/store/main.state";
import { currentCompanyIdSelector } from "@app/store/company/current-company-id/current-company-id.selector";
import { SetId } from "@app/store/company/current-company-id/current-company-id.actions";
import { map, tap } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = "front-example";

  companies$: Observable<Company[]>;
  currentCompanyId$: Observable<number>;

  constructor(
    private _context: Context,
    private _store: Store<MainState>
  ) {}

  ngOnInit(): void {
    this.companies$ = this._context.companies$;
    this.currentCompanyId$ = this._store.pipe(currentCompanyIdSelector());
  }

  changeCompany(companyId: number) {
    this._store.dispatch(new SetId(companyId));
  }
}
