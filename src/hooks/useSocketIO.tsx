import { Answer } from "docker/response"
import { useEffect, useState } from "react"
import { socket } from "../socket/core"



export function useSocketIO<T>(event : string, ...args: any[] ) {
    const [answer, setAnswer] =useState<Answer<T>|undefined>(undefined)

    const fetch =() => {
        socket.emit(event, ...[...args, (response : object)=>{
            console.log("received response :", response)
            setAnswer((response  as Answer<T>))
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


