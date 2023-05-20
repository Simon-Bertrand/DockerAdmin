import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { socket } from "../socket/connection"
import { Answer } from "utils/fetch"
import { toast } from "react-toastify"
import { AppContextSchema, useAppContext } from "../context/app"

export function pingSocketIO(setStore : Dispatch<SetStateAction<AppContextSchema>>) {
    socket.emit("ping", (response : Answer<{system:boolean}>)=>{
        if (response.state==0) {
            setStore(curr => { return {...curr, connected:false}})
            toast.error("Disconnect from Docker socket")
        }
        if (response.state!=0) {
            setStore(curr => { return {...curr, connected:true}})
            toast.success("Connected to the Docker socket")

        }
    })
}


export function useSocketIO<T>(event : string, ...args: any[] ) {
    const [answer, setAnswer] =useState<Answer<T>|undefined>(undefined)
    const {store, setStore} = useAppContext()
    const fetch =() => {
        socket.emit(event, ...[...args, (response : Answer<T>)=>{
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

export function useSocketIOSubscription<T>(event : string, containerName : string, maxLength = 50) {
    const [answer, setAnswer] =useState<T[]>([])

    useEffect(() => {
        socket.emit("subscribe", event, containerName, (res : Answer<undefined>) => toast.info(`${res.message}`))
        socket.on(event+containerName, (data) => {
            setAnswer(curr => [...curr, data].slice(0, maxLength))
        });
    
        return () => {
            socket.emit("unsubscribe", event, containerName, (res : Answer<undefined>) => toast.info(`${res.message}`))
            socket.off(event)
        }
      }, [])

    return {
        answer
    }
}


export function cacheSocketIO<T>(event : string, accessor : string ) {
    const {store, setStore} = useAppContext()
    const fetch = () => {
        socket.emit(event, (response : Answer<T>) =>  {
            setStore(curr => { return {...curr,  [accessor]: response.payload}})
        })
    }
    useEffect(() => {
        if (store.info === null) {
            fetch()
        }
    }, [])
    return {
        isLoading : store.info !== null,
        cache : store.info,
        refetch : fetch
    }
}