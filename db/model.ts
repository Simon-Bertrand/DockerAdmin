import { PrismaClient, user } from "@prisma/client"



const default_select = {
    "createdAt":true,
    "id" : true,
    "login" : true,
    "password" : false,
    "updatedAt":true
}

export default function User(prismaUser: PrismaClient['user']) {
    return Object.assign(prismaUser, {

      async fetch(where: object): Promise<Omit<user, "password">[]> {
        return prismaUser.findMany({ 
            select : default_select,
            where : where
        })
      },
      async login(credentials: Record<never, string>|undefined): Promise<Omit<user, "password">|null> {
        return await prismaUser.findFirst({
            where: {
              login: credentials.login,
              password : credentials.password
            },
            select : default_select
          })
      },
      async create_default_admin(): Promise<Omit<user, "password">|null> {
        return await prismaUser.create({
            data : {
                login:"admin",
                password : "admin"
            },
            select:default_select
        })
    }
    })
  }
