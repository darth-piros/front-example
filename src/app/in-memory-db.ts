import { Company } from "@app/models/company";
import { User } from "@app/models/user";
import {
  generateCompanyDescription,
  generateCompanyName,
  generateFirstName,
  generateMiddleName,
  generateName, generateWord
} from "@app/functions/generator.functions";

export class Context {

  get companies(): ReadonlyArray<Company> {
    return this._companies;
  }
  get users(): ReadonlyArray<User> {
    return this._users;
  }

  constructor(private _companies: Company[], private _users: User[]) {
  }

  addOrUpdateCompany(company: Company): Company {
    const index = this.companies.findIndex(a => a.id === company.id);
    if (index >= 0) {
      this._companies = [
        ...this.companies.slice(0, index),
        company,
        ...this.companies.slice(index + 1)
      ];
    } else {
      this._companies = [...this.companies, company];
    }

    return {...company};
  }
}

export function contextFactory(): Context {
  const companies: Company[] = [];
  for (let i = 0; i < 15; i++) {
    companies.push({
      id: i,
      name: generateCompanyName(),
      description: generateCompanyDescription()
    });
  }

  const users: User[] = [];
  let userId = 0;
  for (const company of companies) {
    for (let i = 0; i < 3; i++) {
      const name = generateName();
      const firstName = generateFirstName();
      const middleName = generateMiddleName();
      users.push({
        id: userId++,
        companyId: company.id,
        name,
        firstName,
        middleName,
        email: `${name}.${firstName}@${company.name.replace(" ", ".")}.${generateWord(3)}`
      });
    }
  }

  return new Context(companies, users);
}
