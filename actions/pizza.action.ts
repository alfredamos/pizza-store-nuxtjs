"use server";

import { PizzaDb } from "@/db/pizza.db";
import { Pizza } from "@prisma/client";

export const createPizza = async (formData: FormData) => {
  //----> Get the pizza from the request.
  const { name, price, topping, quantity, image, description, userId } =
    Object.fromEntries(formData) as unknown as Pizza;
  //----> Store the new pizza in the database.
  return await PizzaDb.createPizza({
    name,
    price: +price,
    topping,
    quantity: +quantity,
    image,
    description,
    userId,
  });
  
};

export const deletePizzaById = async ( id: string ) => {
  //----> Delete the pizza from the database.
  const deletedPizza = await PizzaDb.deletedPizza(id);
  //----> Send back the response.
  return deletedPizza;
};

export const editOnePizza = async (formData: FormData) => {
  //----> Get the pizza to update from request.
  const { name, price, topping, quantity, image, description, userId, id } =
    Object.fromEntries(formData) as unknown as Pizza;
  //----> Delete the pizza from the database.
  const editedPizza = await PizzaDb.editPizza(id, {
    name,
    price: +price,
    topping,
    quantity: +quantity,
    image,
    description,
    userId,
  });
  //----> Send back the response.
  return editedPizza
};

export const editPizzaById = async (pizza: Pizza) => {
  //----> Get the pizza to update from request.
  const { name, price, topping, quantity, image, description, userId, id } =
    pizza;
  //----> Delete the pizza from the database.
  const editedPizza = await PizzaDb.editPizza(id, {
    name,
    price: +price,
    topping,
    quantity: +quantity,
    image,
    description,
    userId,
  });
  //----> Send back the response.
  return editedPizza
};

export const getAllPizza = async () => {
  //----> Get all pizzas from the database.
  const pizza = await PizzaDb.getAllPizza();
  //----> Send back the response.
  return pizza;
};

export const getPizzaById = async (id: string) => {
  //----> Retrieve pizza from database.
  const pizza = await PizzaDb.detailPizza(id);
  //----> Send back the response back.
  return pizza;
};
