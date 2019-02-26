import { Injectable } from "@angular/core";
import { Context } from "@app/in-memory-db";
import { Company } from "@app/models/company";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CompanyService {

  readonly delay = 1500;

  constructor(
    private _context: Context
  ) { }

  getCompanies(): Observable<Company[]> {
    return of([...this._context.companies]).pipe(delay(this.delay));
  }

  getCompanyById(companyId: number): Observable<Company> {
    return of({...this._context.companies.find(a => a.id === companyId)}).pipe(delay(this.delay));
  }

  saveCompany(company: Company): Observable<Company> {
    return of(this._context.addOrUpdateCompany(company)).pipe(delay(this.delay));
  }
}
