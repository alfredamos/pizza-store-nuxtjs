import GithubProvider from "@auth/core/providers/github";
import type { AuthConfig } from "@auth/core/types";
import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "@auth/core/providers/credentials"
import prisma from "~/db/prisma.db";

// The #auth virtual import comes from this module. You can use it on the client
// and server side, however not every export is universal. For example do not
// use sign-in and sign-out on the server side.

const runtimeConfig = useRuntimeConfig();

// Refer to Auth.js docs for more details
export const authOptions: AuthConfig = {
  secret: runtimeConfig.authJs.secret,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signup",
  },
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
    }),
  ],
};

export default NuxtAuthHandler(authOptions, runtimeConfig);
// If you don't want to pass the full runtime config,
//  you can pass something like this: { public: { authJs: { baseUrl: "" } } }
