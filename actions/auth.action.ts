import { ChangePasswordModel } from "@/models/changePassword.model";
import { EditProfileModel } from "@/models/editProfile.model";
import { LoginModel } from "@/models/login.model";
import { SignupModel } from "@/models/signup.model";
import { UserInfoModel } from "@/models/userInfo.model";
import { UserRoleChangeModel } from "@/models/userRoleChange.model";
import { authDb } from "~/db/auth.db";

export async function changePasswordAction(formData: FormData) {
  //----> Get the payload.
  const { email, confirmPassword, oldPassword, newPassword } =
    Object.fromEntries(formData) as unknown as ChangePasswordModel;
  //----> Change the password and store the updated user credentials in the database.
  return await authDb.changePassword({
    email,
    confirmPassword,
    oldPassword,
    newPassword,
  });
}

export async function editProfileAction(formData: FormData) {
  //----> Get the edit-profile from form data.
  const { address, name, email, phone, image, gender, password } =
    Object.fromEntries(formData) as unknown as EditProfileModel;
  //----> edit user profile and store it in the database.
  console.log({ address, name, email, phone, image, gender, password });

  const updatedUser = await authDb.editProfile({
    address,
    name,
    email,
    phone,
    image,
    gender,
    password,
  });
  //----> send back response.
  return updatedUser
}

export async function loginAction(formData: FormData) {
  //----> Get the user credentials from the request.
  const loginCredentials = Object.fromEntries(
    formData
  ) as unknown as LoginModel;
  //----> Destructure formData.
  const { email, password } = loginCredentials;
  //----> Login the user in.
  /* return await signIn("credentials", {
    email,
    password,
    redirect: false,
  }); */
}

export async function logoutAction() {
  //await signOut({ redirect: true });
}

export async function signupAction(formData: FormData) {
  //----> Get the user credentials from the request.
  const {
    address,
    name,
    email,
    phone,
    image,
    confirmPassword,
    password,
    gender,
  } = Object.fromEntries(formData) as unknown as SignupModel;

  //----> Store the new user credentials in the database.
  const newUser = await authDb.signup({
    address,
    name,
    email,
    phone,
    image,
    gender,
    confirmPassword,
    password,
  });
  //----> send back response.

  return newUser
}

export async function currentUserAction(id: string) {
  //----> Get the current user from the database.
  const userCurrent = await authDb.currentUser(id);

  //----> Send back the response.
  return userCurrent;
}

export async function updateUserRoleAction(
  userInfo: UserInfoModel,
  userRoleChangeModel: UserRoleChangeModel
) {
  //----> Get the email and user details of person to be made admin.
  const { email, role } = userRoleChangeModel;

  //----> Change the user role and store the new credentials in the database.
  const userCredentials = await authDb.updateUserRole(userInfo, email, role);

  //----> Send back the response.
  return userCredentials;
}
