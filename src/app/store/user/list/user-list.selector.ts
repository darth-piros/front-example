import { SelectorFunction } from "@app/models/selector-function";
import { Observable } from "rxjs";
import { MainState } from "@app/store/main.state";
import { select } from "@ngrx/store";
import { UserListState } from "@app/store/user/list/user-list.state";
import { userSelector } from "@app/store/user/user.selector";
import { User } from "@app/models/user";

export function userListSelector(): SelectorFunction<UserListState> {
  return (source$: Observable<MainState>): Observable<UserListState> => source$.pipe(
    userSelector(),
    select(state => state ? state.list : null)
  );
}

export function userListItemsSelector(): SelectorFunction<User[]> {
  return (source$: Observable<MainState>): Observable<User[]> => source$.pipe(
    userListSelector(),
    select(state => state ? state.items : [])
  );
}

export function userListLoadingSelector(): SelectorFunction<boolean> {
  return (source$: Observable<MainState>): Observable<boolean> => source$.pipe(
    userListSelector(),
    select(state => state ? state.loading : false)
  );
}
