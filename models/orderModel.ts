import { User, CartItem, Status } from "@prisma/client";

export class OrderModel {
  id!: string;
  userId!: string;
  user?: User;
  cartItems: CartItem[] = [];
  isDelivered?: boolean;
  isShipped?: boolean;
  deliveryDate?: Date;
  shippingDate?: Date;
  orderDate!: Date;
  status!: Status;
  totalPrice!: number;
  totalQuantity!: number;
}