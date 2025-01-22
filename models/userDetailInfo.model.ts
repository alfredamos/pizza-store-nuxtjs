import { Address } from "@prisma/client";
import { UserDetailModel } from "./userDetail.model";

export class UserDetailInfoModel {
  userDetail: UserDetailModel = new UserDetailModel();
  addresses: Address[] = [];

}