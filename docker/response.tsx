import { AppContextSchema } from "@/src/context/app"
import { Dispatch, SetStateAction } from "react"

export interface Answer<T> {
    payload? : T,
    message : string,
    state : number
}


// export async function HTTPFetch<T>(api_call : Promise<Response>) : Promise<HTTPResponseData<T>>  {
//     const data = await api_call
//     console.log({api_call})
//     return { answer : await data.json(), http_status: data.status} as HTTPResponseData<T>
// }

export interface HTTPResponseData<T> {
    answer : Answer<T>,
    http_status : number
}

export class HTTPResponse<T> {
    data : HTTPResponseData<T>
    constructor(httpResponseData : HTTPResponseData<T>) {
        this.data = httpResponseData
    }
    onDockerClientUnavailable(setStore : Dispatch<SetStateAction<AppContextSchema>>) {
        if (this.data.http_status === 503 && this.data.answer.state === 0) { setStore(curr => {return {...curr, connected: false}})}
        return this
    }
    onSuccess(func : (data : Answer<T>) => void) {
        if (this.data.http_status === 200) { func(this.data.answer)}
        return this
    }
    onFail(func : (message : string) => void) {
        if (this.data.http_status !== 200) { func(this.data.answer.message)}
        return this
    }
}
