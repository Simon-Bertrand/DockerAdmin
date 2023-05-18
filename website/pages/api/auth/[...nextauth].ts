import prisma  from "@db/client"
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"



// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
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

    async jwt({ token, user } : {token:string, user : object}) {
      token.userRole = "admin"
      user && (token.user = user);
      return token
    },
    async session({session, token} : {token:string, session : object}) {
      session.user = token.user;
      return session
    },
  },
}

export default NextAuth(authOptions)

