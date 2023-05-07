import { AppContextSchema } from "@/src/context/app"
import { Dispatch } from "react"



export default function Fetch(url : string, options = {}) : Promise<Response> {
    return fetch((process.env.NEXTAUTH_URL??"") + "/back" +  url, options)
}
