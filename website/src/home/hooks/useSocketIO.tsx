import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { socket } from "../socket/connection"
import { Answer } from "utils/fetch"
import { toast } from "react-toastify"
import { AppContextSchema, useAppContext } from "../context/app"

export function pingSocketIO( setStore : Dispatch<SetStateAction<AppContextSchema>>) {
    socket.emit("ping", (response : Answer<{system:boolean}>)=>{
        if (response.state==0) { //  && store.connected
            setStore(curr => { return {...curr, connected:false}})
            toast.error("Disconnect from Docker socket")
        }
        if (response.state!=0 ) { // && !store.connected
            setStore(curr => { return {...curr, connected:true}})
            toast.success("Connected to the Docker socket")

        }
    })
}


export function useSocketIO<T>(event : string, ...args: any[] ) {
    const [answer, setAnswer] =useState<Answer<T>|undefined>(undefined)
    const {store, setStore} = useAppContext()
    const fetch =() => {
        console.log("Fetched event : ",event)
        socket.emit(event, ...[...args, (response : Answer<T>)=>{
            console.log("Received response :", response)
            if (response.state==1) {
                setAnswer(response)
            } 
            else {
                toast.error("Failed to fetch : "+ response.message)
            }

            if (response.state==0 && store.connected) {
                setStore(curr => { return {...curr, connected:false}})
            }
            if ((response.state!=0) && (!store.connected)) {
                setStore(curr => { return {...curr, connected:true}})
            }
        }])
    }
    useEffect(() => {
        fetch()
        }, [])

    return {
        isLoading : answer?.payload !== undefined,
        ...answer,
        refetch : fetch
    }
}

export function useSocketIOStateless(event : string, ...args: any[] ) {
    socket.emit(event, ...args)
}

export function useSocketIOSubscription<T>(event : string, containerName : string) {
    const [answer, setAnswer] =useState<T[]>([])

    useEffect(() => {
        socket.emit("subscribe", event, containerName)
        console.log(`Listening ${event+containerName}`)
        socket.on(event+containerName, (data) => {
            console.log("Received event from ", event+containerName)
            setAnswer(curr => [...curr, data])
        });
    
        return () => {
            socket.emit("unsubscribe", event, containerName, (res) => console.log("unsub ack :", res))
            console.log("unsubscribe", event, containerName)
            socket.off(event)
        }
      }, [])

    return {
        answer
    }
}


