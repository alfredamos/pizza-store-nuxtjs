import { User } from "@prisma/client";
import { AuthResponseModel } from "./authResponse.model";

export class AuthState {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  currentUser: AuthResponseModel  = new  AuthResponseModel();
  token: string | null = null;
}
