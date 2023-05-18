import { PrismaClient } from "@prisma/client";
import User from "./model";


let prisma : PrismaWrapper

class PrismaWrapper {
    conn; user;
    constructor () {
        this.conn = new PrismaClient()
        this.user = User(this.conn.user)

        const createAccountIfEmpty = async () => {
            if (await this.user.count() === 0) {
                this.user.create_default_admin()
            }
        }
        createAccountIfEmpty()
        .catch(x=>{console.log("Failed at create default admin account")})
        .finally(()=> console.log("Created default admin account"))
    }
}



if (process.env.NODE_ENV === 'production') {
	prisma = new PrismaWrapper()
}
else {
	if (!global.prisma) {
		global.prisma = new PrismaWrapper()
	}

	prisma = global.prisma
}

export default prisma