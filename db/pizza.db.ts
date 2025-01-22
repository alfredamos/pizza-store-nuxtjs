import prisma from "@/db/prisma.db";
import { PizzaModel } from "@/models/pizza.model";
import type{ Pizza } from "@prisma/client";

type PizzaWithoutId = Omit<Pizza, "id">;

export class PizzaDb {
  constructor() {}

  static async createPizza(pizza: PizzaModel): Promise<Pizza> {
    const newPizza = await prisma.pizza.create({ data: pizza as Pizza });

    if (!newPizza) {
      throw new Error("Pizza not created");
    }

    return newPizza;
  }

  static async editPizza(id: string, pizza: PizzaWithoutId): Promise<Pizza> {
    await this.detailPizza(id);

    const editedPizza = await prisma.pizza.update({
      data: pizza,
      where: { id },
    });

    if (!editedPizza) {
      throw new Error(`Pizza with id: ${id} cannot be updated`);
    }

    return editedPizza;
  }

  static async deletedPizza(id: string): Promise<Pizza> {
    await this.detailPizza(id);

    const deletedPizza = await prisma.pizza.delete({ where: { id } });

    return deletedPizza;
  }

  static async detailPizza(id: string): Promise<Pizza> {
    const pizza = await prisma.pizza.findUnique({ where: { id } });

    if (!pizza) {
      throw new Error(`Pizza with id: ${id} is not found`);
    }

    return pizza;
  }

  static async getAllPizza(): Promise<Pizza[]> {
    return await prisma.pizza.findMany({});
  }
}
