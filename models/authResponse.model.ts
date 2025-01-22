import { UserResponseModel } from './userResponse.model';

export class AuthResponseModel { 
  user: UserResponseModel = new UserResponseModel();
  signIn?: UserResponseModel;
  token: string = "";
  isLoggedIn: boolean = false;
  isAdmin?: boolean
}