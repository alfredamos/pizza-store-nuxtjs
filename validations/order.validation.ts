import {z} from 'zod';

export const orderSchema = z.object({
   id: z.string().optional(),
  
  totalQuantity: z.number(),
  isShipped: z.boolean().optional(),
  isDelivered: z.boolean().optional(),
  totalPrice: z.number(), 
  userId: z.string(),
  status: z.enum(['Delivered','Pending', 'Shipped'])
})