import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { User } from "@app/models/user";
import { Store } from "@ngrx/store";
import { MainState } from "@app/store/main.state";
import { userListItemsSelector, userListLoadingSelector } from "@app/store/user/list/user-list.selector";
import { currentCompanyIdSelector } from "@app/store/company/current-company-id/current-company-id.selector";
import { distinctUntilChanged, takeUntil } from "rxjs/operators";
import { Clear, Delete, Load } from "@app/store/user/list/user-list.actions";
import { Edit } from "@app/store/user/edit/user-edit.actions";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit, OnDestroy {

  users$: Observable<User[]>;

  loading$: Observable<boolean>;

  displayColumns = ["name", "firstName", "middleName", "email", "actions"];

  private _destroyed$ = new Subject();

  constructor(
    private _store: Store<MainState>
  ) { }

  ngOnInit() {
    this.users$ = this._store.pipe(userListItemsSelector());
    this.loading$ = this._store.pipe(userListLoadingSelector());

    this._store.pipe(
      currentCompanyIdSelector(),
      distinctUntilChanged(),
      takeUntil(this._destroyed$),
    ).subscribe(() => this._store.dispatch(new Load()));
  }

  ngOnDestroy(): void {
    this._store.dispatch(new Clear());
  }

  edit(userId: number) {
    this._store.dispatch(new Edit(userId));
  }

  delete(userId: number) {
    this._store.dispatch(new Delete(userId));
  }

}
