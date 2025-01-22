import { CartItem } from "../validations/cartItemValidation";
import { Status } from "./Status";

export class OrderProduct{
  id?: string;
  customerId: string = "";
  cartItems: CartItem[] = [];
  isShipped?: boolean = false;
  isDelivered?: boolean = false;
  status?: Status = Status.Pending;
}