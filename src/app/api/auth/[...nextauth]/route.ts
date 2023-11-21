import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import AzureADProvider from "next-auth/providers/azure-ad";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { signInWithUserNamePassword } from "@/auth";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),

    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID ?? "",
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET ?? "",
      tenantId: process.env.AZURE_AD_TENANT_ID ?? "",
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),

    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password", placeholder: "****" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = await signInWithUserNamePassword(
          credentials!.email,
          credentials!.password
        );
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        }
        // If you return null then an error will be displayed advising the user to check their details.
        return null;

        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn(params) {
      return true;
    },

    async jwt(params) {
      const dbUser = await prisma.user.findUnique({
        where: { email: params.token.email ?? "no-email" },
      });

      if (dbUser?.isActive === false) {
        throw Error("Not an Active User");
      }

      params.token.id = dbUser?.id ?? "no-id";
      params.token.roles = dbUser?.roles ?? ["no-roles"];
      return params.token;
    },

    async session(params) {
      if (params.session && params.session.user) {
        params.session.user.roles = params.token.roles;
        params.session.user.id = params.token.id;
      }
      return params.session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
