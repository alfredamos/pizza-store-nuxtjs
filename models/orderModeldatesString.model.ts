import { CartItem, Status } from "@prisma/client";
import { User } from "next-auth";

export class OrderModelDatesString{
  id!: string;
  userId!: string;
  user?: User;
  cartItems: CartItem[] = [];
  isDelivered?: boolean;
  isShipped?: boolean;
  deliveryDate?: string;
  shippingDate?: string;
  orderDate!: string;
  status!: Status;
  totalPrice!: number;
  totalQuantity!: number;
}