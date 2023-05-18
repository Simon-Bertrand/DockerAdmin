import { withAuth } from "next-auth/middleware"

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      if (req.nextUrl.pathname === "/admin") {
        return token?.userRole === "admin"
      }
      return !!token
    },
  },
})

export const config = { matcher: ["/((?!login).*)"] }
