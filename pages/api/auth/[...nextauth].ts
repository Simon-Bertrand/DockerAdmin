import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import {prisma} from "db/client"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {},
      async authorize(credentials, req) {
        return (  await prisma.user.login(credentials) )
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {

    async jwt({ token, user }) {
      token.userRole = "admin"
      user && (token.user = user);
      return token
    },
    async session({session, token}) {
      session.user = token.user;
      return session
    },
  },
}

export default NextAuth(authOptions)

