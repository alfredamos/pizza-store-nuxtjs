import { Role } from "@prisma/client";

export class AdminUserModel {
  id: string = "";
  name!: string;
  email!: string;
  gender!: string;
  phone!: string;
  role!: Role;
  token?: string;
}
