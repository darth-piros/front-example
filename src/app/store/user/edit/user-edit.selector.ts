import { SelectorFunction } from "@app/models/selector-function";
import { Observable } from "rxjs";
import { MainState } from "@app/store/main.state";
import { select } from "@ngrx/store";
import { MatDialogRef } from "@angular/material";
import { userSelector } from "@app/store/user/user.selector";
import { UserEditState } from "@app/store/user/edit/user-edit.state";
import { User } from "@app/models/user";

export function userEditSelector(): SelectorFunction<UserEditState> {
  return (source$: Observable<MainState>): Observable<UserEditState> => source$.pipe(
    userSelector(),
    select(state => state ? state.edit : null)
  );
}

export function userEditLoadingSelector(): SelectorFunction<boolean> {
  return (source$: Observable<MainState>): Observable<boolean> => source$.pipe(
    userEditSelector(),
    select(edit => edit ? edit.loading : false)
  );
}

export function userEditDialogRefSelector(): SelectorFunction<MatDialogRef<any>> {
  return (source$: Observable<MainState>): Observable<MatDialogRef<any>> => source$.pipe(
    userEditSelector(),
    select(edit => edit ? edit.dialogRef : null)
  );
}

export function userEditItemSelector(): SelectorFunction<User> {
  return (source$: Observable<MainState>): Observable<User> => source$.pipe(
    userEditSelector(),
    select(edit => edit ? edit.item : null)
  );
}
