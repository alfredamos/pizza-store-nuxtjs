import { CartItem } from "@prisma/client";

export class OrderPayload{
  cartItems: CartItem[] = [];
  paymentId: string = "";
  userId: string = "";
  totalPrice: number = 0;
  totalQuantity: number = 0;
  orderDate: Date = new Date();

}