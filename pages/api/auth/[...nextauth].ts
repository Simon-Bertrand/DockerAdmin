import { prisma } from 'db/client';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
     providers: [
      CredentialsProvider({
       id:"user-login",
       name: "Login",
       credentials: {
         login: { },
         password: {}
       },
       async authorize(credentials, req) {
        console.log("here", credentials)
           const user =  await prisma.user.findFirst({
            where : {...credentials}
           })
           return user?user:null
       }
       })
     ],
     secret : process.env.NEXTAUTH_SECRET,
     session : {
       strategy : "jwt"
     },
     pages : {
       signIn : "/login"
     },

     callbacks: {
      //  async session({ session, token, user }) {
      //    session.user = token.user
      //    return session
      //  },
      //  async jwt({ token, account, profile, user }) {
      //    user && (token.user = user);
      //    return token
      //  }
     }
};


