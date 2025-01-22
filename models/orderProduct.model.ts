import { CartItem, Order } from "@prisma/client";

export class OrderProduct{
    order!: Order;
    cartItems: CartItem[] = [];
}