import { AppContextSchema } from "@/src/context/app"
import { Dispatch } from "react"
import { HTTPResponseData } from "./response"



export default async function Fetch<T>(url : string, options = {}) : Promise<HTTPResponseData<T>> {
    const data = await fetch((process.env.NEXTAUTH_URL??"") + "/back" +  url, options)
    return { answer : await data.json(), http_status: data.status} as HTTPResponseData<T>
}

