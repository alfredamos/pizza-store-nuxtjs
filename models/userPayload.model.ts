import { Address} from "@prisma/client";
import { SignupModel } from './signup.model';

export class UserPayload extends SignupModel{
    addresses: Address[] = [];
  
}