import { PrismaClient } from "@prisma/client";
import User from "./model";
import Console from "utils/console";


let prisma : PrismaWrapper

class PrismaWrapper {
    conn; user;
    constructor () {
        this.conn = new PrismaClient()
        this.user = User(this.conn.user)
        Console.server_info("PrismaWrapper", "Instanciated the object")
        const createAccountIfEmpty = async () => {
            if (await this.user.count() === 0) {
                this.user.create_default_admin()
                Console.server_info("PrismaWrapper", "Created admin account")
            }
        }
        createAccountIfEmpty()
        .catch(x=>{Console.server_info("PrismaWrapper", "Failed at create default admin account")})
        
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