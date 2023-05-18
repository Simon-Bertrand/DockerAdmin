import { PrismaClient, user } from "@prisma/client"
var SHA256 = require("crypto-js/sha256");
const hash = (v) => {
  return SHA256(v).toString()
}

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
        console.log("prismaUser:")
        console.log(await prismaUser.findFirst({
          select : default_select
        }) )

        return await prismaUser.findFirst({
            where: {
              login: credentials.login,
              password : hash(credentials.password)
            },
            select : default_select
          })
      },
      async create_default_admin(): Promise<Omit<user, "password">|null> {
        return await prismaUser.create({
            data : {
                login:"admin",
                password : hash("admin")
            },
            select:default_select
        })
    },
      async updateHashed(options): Promise<Omit<user, "password">|null> {
        let user = options.data
        user.password && (user.password = hash(user.password))
        return await prismaUser.update({
            where : options.where,
            data : user,
            select: default_select
        })
    } ,
      async createHashed(options): Promise<Omit<user, "password">|null> {
        let user = options.data
        if(user.password.trim().length <6){
          throw Error("The length of the password cannot be less than 6")
        }
        user.password = hash(user.password)
        
        return await prismaUser.create({
            data : user,
            select:default_select
        })
    }
    })
  }
