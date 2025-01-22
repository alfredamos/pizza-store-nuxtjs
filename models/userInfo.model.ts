import { Role } from "@prisma/client";

export class UserInfoModel {
  id: string = "";
  name: string = "";
  role: Role = Role.User;
  isLoggedIn?: boolean = false;
  token?: string = "";
  message?: string = "";
}
