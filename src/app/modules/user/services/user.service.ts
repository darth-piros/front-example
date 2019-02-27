import { Injectable } from "@angular/core";
import { Context } from "@app/in-memory-db";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";
import { REQUEST_DELAY } from "@app/constants/request-delay.constant";
import { User } from "@app/models/user";

@Injectable({
  providedIn: "root"
})
export class UserService {

  constructor(
    private _context: Context
  ) { }

  create(companyId): User {
    return this._context.createUser(companyId);
  }

  getByCompanyId(companyId: number): Observable<User[]> {
    return of(this._context.users.filter(a => a.companyId === companyId)).pipe(delay(REQUEST_DELAY));
  }

  getById(userId: number): Observable<User> {
    return of({...this._context.users.find(a => a.id === userId)}).pipe(delay(REQUEST_DELAY));
  }

  save(user: User): Observable<User> {
    return of(this._context.addOrUpdateUser(user)).pipe(delay(REQUEST_DELAY));
  }

  delete(userId: number): Observable<boolean> {
    return of(this._context.deleteUser(userId));
  }
}
