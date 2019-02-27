import { SelectorFunction } from "@app/models/selector-function";
import { Observable } from "rxjs";
import { MainState } from "@app/store/main.state";
import { select } from "@ngrx/store";
import { UserState } from "@app/store/user/user.state";
import { USER_FEATURE_NAME } from "@app/store/user/user-feature-name";

export function userSelector(): SelectorFunction<UserState> {
  return (source$: Observable<MainState>): Observable<UserState> => source$.pipe(
    select(state => state ? state[USER_FEATURE_NAME] : null)
  );
}
