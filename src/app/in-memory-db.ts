import { Company } from "@app/models/company";
import { User } from "@app/models/user";
import {
  generateCompanyDescription,
  generateCompanyName,
  generateFirstName,
  generateMiddleName,
  generateName, generateWord
} from "@app/functions/generator.functions";

let uniqueCompanyId = 0;
let uniqueUserId = 0;

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

  deleteCompany(companyId: number): number {
    this._companies = this._companies.filter(a => a.id !== companyId);
    this._users = this._users.filter(a => a.companyId !== companyId);
    if (this.companies.length > 0) {
      return this.companies[0].id;
    }
    return -1;
  }

  addOrUpdateUser(user: User): User {
    const index = this.users.findIndex(a => a.id === user.id);
    if (index >= 0) {
      this._users = [
        ...this.users.slice(0, index),
        user,
        ...this.users.slice(index + 1)
      ];
    } else {
      this._users = [...this.users, user];
    }

    return {...user};
  }

  createUser(companyId: number): User {
    return createUser(companyId);
  }

  deleteUser(userId: number): boolean {
    this._users = this._users.filter(a => a.id !== userId);
    return true;
  }
}

export function contextFactory(): Context {
  const companies: Company[] = [];
  for (let i = 0; i < 15; i++) {
    companies.push({
      id: uniqueCompanyId++,
      name: generateCompanyName(),
      description: generateCompanyDescription()
    });
  }

  const users: User[] = [];
  for (const company of companies) {
    for (let i = 0; i < 3; i++) {
      users.push(createUser(company.id));
    }
  }

  return new Context(companies, users);
}

function createUser(companyId: number): User {
  const name = generateName();
  const firstName = generateFirstName();
  const middleName = generateMiddleName();
  return {
    id: uniqueUserId++,
    companyId,
    name,
    firstName,
    middleName,
    email: `${name}.${firstName}@${generateWord(7)}.${generateWord(3)}`
  };
}
