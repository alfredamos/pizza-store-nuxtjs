"use server";

import { CartItemDb } from "@/db/cartItem.db";
import { CartItem } from "@prisma/client";

export const createCartItem = async (formData: FormData) => {
  //----> Get the cart item from the request.
  const newCartItem = Object.fromEntries(formData) as unknown as CartItem;
  //----> Store the new cart item in the database.
  const createdCartItem = await CartItemDb.createCartItem(newCartItem);
  //----> Send back the response.

  return createdCartItem;
};

export const deleteCartItemById = async (prevState: { id: string }) => {
  //----> Get the cart item id from params.
  const {id} = prevState;
  //----> Delete the cart item from the database.
  const deletedCartItem = await CartItemDb.deletedCartItem(id);
  //----> Send back the response.
  return deletedCartItem;
};

export const editCartItemById = async (formData: FormData) => {
  //----> Get the cart item to update from request.
  const cartItemToUpdate = Object.fromEntries(formData) as unknown as CartItem;
  //----> Destructure cartItem to update;
  const { id, ...rest } = cartItemToUpdate;
  //----> Delete the cart item from the database.
  const editedCartItem = await CartItemDb.editCartItem(id, rest);
  //----> Send back the response.
  return editedCartItem;
};

export const getAllCartItem = async () => {
  //----> Get all cart items from the database.
  const cartItem = await CartItemDb.getAllCartItems();
  //----> Send back the response.
  return cartItem;
};

export const getCartItemById = async (prevState: { id: string }) => {
  //----> Get the cart item id from params.
  const {id} = prevState;
  //----> Retrieve cart item from database.
  const cartItem = await CartItemDb.detailCartItem(id);
  //----> Send back the response back.
  return cartItem;
};
