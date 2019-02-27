import { Injectable } from "@angular/core";
import { Context } from "@app/in-memory-db";
import { Company } from "@app/models/company";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";
import { REQUEST_DELAY } from "@app/constants/request-delay.constant";

@Injectable({
  providedIn: "root"
})
export class CompanyService {

  constructor(
    private _context: Context
  ) { }

  getAll(): Observable<Company[]> {
    return of([...this._context.companies]).pipe(delay(REQUEST_DELAY));
  }

  getById(companyId: number): Observable<Company> {
    return of({...this._context.companies.find(a => a.id === companyId)}).pipe(delay(REQUEST_DELAY));
  }

  save(company: Company): Observable<Company> {
    return of(this._context.addOrUpdateCompany(company)).pipe(delay(REQUEST_DELAY));
  }

  delete(companyId: number): Observable<number> {
    return of(this._context.deleteCompany(companyId));
  }
}
