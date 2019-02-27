import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "@app/models/user";
import { Store } from "@ngrx/store";
import { MainState } from "@app/store/main.state";
import { userEditItemSelector, userEditLoadingSelector } from "@app/store/user/edit/user-edit.selector";
import { Save } from "@app/store/user/edit/user-edit.actions";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditComponent implements OnInit {

  loading$: Observable<boolean>;

  item$: Observable<User>;

  constructor(
    private _store: Store<MainState>
  ) { }

  ngOnInit() {
    this.item$ = this._store.pipe(userEditItemSelector());
    this.loading$ = this._store.pipe(userEditLoadingSelector());
  }

  save() {
    this._store.dispatch(new Save());
  }

}
