import prisma from "./prisma.db";
import type{ User } from "@prisma/client";

export class UserDb {
  constructor() {}

  static async deletedUser(id: string): Promise<User> {
    await this.detailUser(id);

    const deletedUser = await prisma.user.delete({ where: { id } });

    return deletedUser;
  }

  static async detailUser(id: string): Promise<User> {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new Error(`User with id: ${id} is not found`);
    }

    return user;
  }

  static async getAllUsers(): Promise<User[]> {
    return await prisma.user.findMany({});
  }
}
