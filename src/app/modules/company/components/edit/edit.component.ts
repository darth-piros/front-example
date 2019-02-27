import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { MainState } from "@app/store/main.state";
import { Observable } from "rxjs";
import { Company } from "@app/models/company";
import { companyEditItemSelector, companyEditLoadingSelector } from "@app/store/company/edit/company-edit.selector";
import { Save } from "@app/store/company/edit/company-edit.actions";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditComponent implements OnInit {

  loading$: Observable<boolean>;

  item$: Observable<Company>;

  constructor(
    private _store: Store<MainState>
  ) { }

  ngOnInit() {
    this.item$ = this._store.pipe(companyEditItemSelector());
    this.loading$ = this._store.pipe(companyEditLoadingSelector());
  }

  save() {
    this._store.dispatch(new Save());
  }

}
