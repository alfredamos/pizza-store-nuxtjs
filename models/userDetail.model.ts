import { Gender, Role} from '@prisma/client';

export class UserDetailModel {
  id: string = "";
  name: string = "";
  email: string = "";
  phone: string = "";
  password: string = "";
  gender: Gender = Gender.Male;
  role: Role = Role.User;
}