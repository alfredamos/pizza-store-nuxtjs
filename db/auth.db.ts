import catchError from "http-errors";
import { StatusCodes } from "http-status-codes";
import prisma from "../../../../Frontend/Next/meal-order/db/prisma.db";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { Role, type User } from "@prisma/client";
import { AuthResponseModel } from "@/models/authResponse.model";
import { ChangePasswordModel } from "@/models/changePassword.model";
import { EditProfileModel } from "@/models/editProfile.model";
import { LoginModel } from "@/models/login.model";
import { SignupModel } from "@/models/signup.model";
import { UserInfoModel } from "@/models/userInfo.model";

export class AuthDb {
  constructor() {}

  async changePassword(changePasswordModel: ChangePasswordModel) {
    //----> Destructure the payload.
    const { email, oldPassword, newPassword, confirmPassword } =
      changePasswordModel;

    //----> Check for password match
    if (!this.matchPassword(newPassword, confirmPassword)) {
      throw catchError(StatusCodes.BAD_REQUEST, "Password must match!");
    }

    //----> Get user from database.
    const user = await this.getUserByEmail(email);

    //----> Check that the old password is correct.
    await this.comparePassword(oldPassword, user.password);

    //----> Hash the new password.
    const hashNewPassword = await this.passwordHarsher(newPassword);

    //----> Store the updated user in the database.
    const updatedUser = await prisma.user.update({
      data: { ...user, password: hashNewPassword },
      where: { email },
    });

    const { role, password, ...rest } = updatedUser;

    return rest;
  }

  async currentUser(userId: string) {
    //----> Retrieve the current user from the database.
    const currentUser = await this.getOneUser(userId);

    //----> Remove role and password from the user object.
    const { password, ...rest } = currentUser;

    return rest;
  }

  async editProfile(editProfileModel: EditProfileModel) {
    //----> Destructure the payload.
    const { email, password, ...rest } = editProfileModel;

    //----> Get the user from database.
    const user = await this.getUserByEmail(email);

    //----> Compare the new password with old password.
    await this.comparePassword(password, user.password);

    //----> Store the updated user in the database.
    const updatedUser = await prisma.user.update({
      data: { ...rest, password: user.password },
      where: { email },
    });

    const { role, password: userPassword, ...restOfData } = updatedUser;

    return restOfData;
  }

  async login(loginModel: LoginModel) {
    //----> Destructure the payload.
    const { email, password } = loginModel;

    //----> Get the user from database.
    const user = await this.getUserByEmail(email);

    //----> Compare the new password with old password.
    await this.comparePassword(password, user.password);

    //----> Get json web token.
    const token = this.getJsonToken(user.id, user.name, user.role);

    const { password: userPassword, role, ...restOfData } = user;

    const authResponse: AuthResponseModel = {
      user: restOfData as User,
      token,
      isLoggedIn: true,
      isAdmin: user?.role === Role.Admin,
    };

    return authResponse;
  }

  async signup(signupModel: SignupModel) {
    //----> Destructure the payload.
    const { email, password, confirmPassword, ...rest } = signupModel;

    //----> Check for password match, check for existence of user.
    await this.signupUtil(confirmPassword, email, password);

    //----> Hash the new password.
    const hashNewPassword = await this.passwordHarsher(password);

    //----> Store the new user in the database.
    const newUser = await prisma.user.create({
      data: { ...rest, role: Role.User, password: hashNewPassword, email },
    });

    const { password: userPassword, ...restOfData } = newUser;

    return restOfData;
  }

  async updateUserRole(userInfo: UserInfoModel, email: string, role: Role) {
    //----> Check for admin rights.
    const isAdmin = userInfo?.role;

    if (!isAdmin) {
      throw catchError(
        StatusCodes.FORBIDDEN,
        "You are not permitted to perform this task!"
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });

    //----> Check if user exist.
    if (!user) {
      throw catchError(
        StatusCodes.NOT_FOUND,
        "This user is not in the database!"
      );
    }

    //----> Make the user an admin.
    const userUpdated = await prisma.user.update({
      where: { email },
      data: { ...user, role },
    });

    const { password, ...restOfData } = userUpdated; //----> Do not send back the password.

    return restOfData;
  }

  private matchPassword(newPassword: string, oldPassword: string) {
    const isMatch = newPassword.normalize() === oldPassword.normalize();

    return isMatch;
  }

  private async getUserById(id: string, includeAddresses: boolean = false) {
    //----> Get the user.
    const user = await prisma.user.findUnique({
      where: { id },
      // include: { addresses: includeAddresses },
    });
    //----> Check for existence of user.
    if (!user) {
      throw catchError(StatusCodes.NOT_FOUND, "Invalid credentials!");
    }

    return user;
  }

  private async getOneUser(id: string) {
    //----> Get the user.
    const user = await prisma.user.findUnique({
      where: { id },
    });
    //----> Check for existence of user.
    if (!user) {
      throw catchError(StatusCodes.NOT_FOUND, "Invalid credentials!");
    }

    return user;
  }

  private async getUserByEmail(email: string) {
    //----> Get user from database.
    const user = await prisma.user.findUnique({ where: { email } });

    //----> Check for existence of user.
    if (!user) {
      throw catchError(StatusCodes.NOT_FOUND, "Invalid credentials!");
    }

    return user;
  }

  private async comparePassword(
    oldPassword: string,
    oldPasswordHashed: string
  ) {
    //----> Compare the new password with old password.
    const isMatch = await bcrypt.compare(oldPassword, oldPasswordHashed);

    //----> Check if the two passwords match.
    if (!isMatch) {
      throw catchError(StatusCodes.UNAUTHORIZED, "Invalid credentials!");
    }

    return isMatch;
  }

  private async passwordHarsher(newPassword: string) {
    //----> Hash the new password.
    return await bcrypt.hash(newPassword, 12);
  }

  private async signupUtil(
    confirmPassword: string,
    email: string,
    password: string
  ) {
    //----> Check for password match
    if (!this.matchPassword(password, confirmPassword)) {
      throw catchError(StatusCodes.BAD_REQUEST, "Password must match!");
    }

    //----> Get user from database.
    const user = await prisma.user.findUnique({ where: { email } });

    //----> Check for existence of user.
    if (user) {
      throw catchError(StatusCodes.BAD_REQUEST, "User already exists!");
    }
  }

  private getJsonToken(id: string, name: string, role: Role) {
    const token = jwt.sign(
      {
        id,
        name,
        role,
      },
      process.env.JWT_TOKEN_SECRET!,
      { expiresIn: "24hr" }
    );

    return token;
  }
}

export const authDb = new AuthDb();
