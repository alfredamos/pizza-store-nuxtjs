import GithubProvider from "@auth/core/providers/github";
import CredentialsProvider from "@auth/core/providers/credentials";
import type { AuthConfig } from "@auth/core/types";
import { NuxtAuthHandler } from "#auth";
import prisma from "./db/prisma.db";
import * as bcrypt from "bcryptjs";

// The #auth virtual import comes from this module. You can use it on the client
// and server side, however not every export is universal. For example do not
// use sign-in and sign-out on the server side.

const runtimeConfig = useRuntimeConfig();

// Refer to Auth.js docs for more details
export const authOptions: AuthConfig = {
  secret: runtimeConfig.authJs.secret,
  providers: [
    GithubProvider({
      clientId: runtimeConfig.github.clientId,
      clientSecret: runtimeConfig.github.clientSecret,
    }),
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "alfredamos@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const cred = credentials as { email: string; password: string };
        const { email, password } = cred;
        if (!email || !password) return null;
        //----> Check for existence of user.
        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (!user) throw new Error("Invalid credentials!");
        //----> Check for password correctness.
        const isPasswordMatch = await bcrypt.compare(
          password as string,
          user.password
        );
        if (!isPasswordMatch) throw new Error("Invalid credentials!");
        //----> Send back the jwt payload.
        return user;
      },
    }),
  ],
};


export default NuxtAuthHandler(authOptions, runtimeConfig);