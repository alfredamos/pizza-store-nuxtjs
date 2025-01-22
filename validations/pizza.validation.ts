import {z} from 'zod';

export const pizzaSchema = z.object({
     id: z.string().optional(),
  name: z.string(),
  topping: z.string(),
  price: z.number(),
  quantity: z.number(),
  image: z.string(),
  description: z.string(),  
  userId: z.string(),
})