import { HasId } from "@app/models/has-id";

export interface Company extends HasId {
  name: string;
  description: string;
}
