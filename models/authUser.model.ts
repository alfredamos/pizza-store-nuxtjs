import { Role } from "prisma/prisma-client";

export class AuthUserModel{
  id: string = "";
  name: string = "";
  role: Role = Role.User;
  token: string = "";

}