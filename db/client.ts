import { PrismaClient } from "@prisma/client";




class PrismaWrapper {
    conn;
    constructor () {
        this.conn = new PrismaClient()


        const createAccountIfEmpty = async () => {
            if (await this.conn.user.count() == 0) {
                this.conn.user.create({data : {
                    login:"admin",
                    password : "admin"
                }})
            }
        }
        createAccountIfEmpty().then(x=>{console.log("Created default admin acocunt")})
    }
}

export const prisma = new PrismaWrapper()