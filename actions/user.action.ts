"use server";

import { UserDb } from "@/db/user.db";

export const deleteUserById = async (id: string) => {
  //----> Delete the user from the database.
  const deletedUser = await UserDb.deletedUser(id);
  //----> Send back the response.
  return deletedUser;
};

export const getAllUsers = async () => {
  //----> Get all users from the database.
  const users = await UserDb.getAllUsers();
  //----> Send back the response.
  //revalidatePath("/users/list");
  return users;
};

export const getUserById = async (prevState: { id: string }) => {
  //----> Get the user id from form.
  const { id } = prevState;
  //----> Retrieve user from database.
  const user = await UserDb.detailUser(id);
  //----> Send back the response back.
  return user;
};
