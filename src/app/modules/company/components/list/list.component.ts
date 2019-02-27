import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { MainState } from "@app/store/main.state";
import { Clear, Delete, Load } from "@app/store/company/list/company-list.actions";
import { Observable } from "rxjs";
import { Company } from "@app/models/company";
import { companyListItemsSelector, companyListLoadingSelector } from "@app/store/company/list/company-list.selector";
import { Edit } from "@app/store/company/edit/company-edit.actions";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit, OnDestroy {

  companies$: Observable<Company[]>;

  loading$: Observable<boolean>;

  displayColumns = ["name", "description", "actions"];

  constructor(
    private _store: Store<MainState>
  ) { }

  ngOnInit() {
    this.companies$ = this._store.pipe(companyListItemsSelector());
    this.loading$ = this._store.pipe(companyListLoadingSelector());

    this._store.dispatch(new Load());
  }

  ngOnDestroy(): void {
    this._store.dispatch(new Clear());
  }

  edit(companyId: number) {
    this._store.dispatch(new Edit(companyId));
  }

  delete(companyId: number) {
    this._store.dispatch(new Delete(companyId));
  }


}
