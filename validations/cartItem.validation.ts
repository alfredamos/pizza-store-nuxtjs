import { z } from "zod";

export const cartItemSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
  pizzaId: z.string(),
  orderId: z.string().optional(),
});
