// import { HTTPResponseData } from "../dockerclient/response"

// export async function Fetch<T>(url : string, options = {}) : Promise<HTTPResponseData<T>> {
//     const data = await fetch((process.env.NEXTAUTH_URL??"") + "/back" +  url, options)
//     return { answer : await data.json(), http_status: data.status} as HTTPResponseData<T>
// }

// import { AppContextSchema } from "@src/home/context/app"
// import { Dispatch, SetStateAction } from "react"

export interface Answer<T> {
    payload? : T,
    message : string,
    state : number
}


// export interface HTTPResponseData<T> {
//     answer : Answer<T>,
//     http_status : number
// }

// export class HTTPResponse<T> {
//     data : HTTPResponseData<T>
//     constructor(httpResponseData : HTTPResponseData<T>) {
//         this.data = httpResponseData
//     }
//     onDockerClientUnavailable(setStore : Dispatch<SetStateAction<AppContextSchema>>) {
//         if (this.data.http_status === 503 && this.data.answer.state === 0) { setStore(curr => {return {...curr, connected: false}})}
//         return this
//     }
//     onSuccess(func : (data : Answer<T>) => void) {
//         if (this.data.http_status === 200) { func(this.data.answer)}
//         return this
//     }
//     onFail(func : (message : string) => void) {
//         if (this.data.http_status !== 200) { func(this.data.answer.message)}
//         return this
//     }
// }
