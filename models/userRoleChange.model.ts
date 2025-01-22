import { Role } from "prisma/prisma-client";

export class UserRoleChangeModel{
    email: string = "";
    role: Role = Role.User;
}