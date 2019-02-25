import { HasId } from "@app/models/has-id";

export interface User extends HasId {
  name: string;
  firstName: string;
  middleName: string;
  email: string;
  companyId: number;
}
