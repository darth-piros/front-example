import { Injectable } from "@angular/core";
import { Context } from "@app/in-memory-db";
import { Company } from "@app/models/company";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CompanyService {

  constructor(
    private _context: Context
  ) { }

  getCompanies(): Observable<ReadonlyArray<Company>> {
    return of(this._context.companies);
  }

  getCompanyById(companyId: number): Observable<Company> {
    return of(this._context.companies.find(a => a.id === companyId));
  }

  saveCompany(company: Company): Observable<Company> {
    return of(this._context.addOrUpdateCompany(company));
  }
}
