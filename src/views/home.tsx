"use client";
import React, { useEffect, useState } from "react";
import {useAppContext} from "../context/app";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { HTTPResponse } from "docker/response";
import { Info } from "docker/models";
import { info } from "docker/api/info";
import { Card } from "@tremor/react";


export const HomeComponent : React.FunctionComponent = () : JSX.Element  => {
    const {setStore} = useAppContext()
    const [data, setData] = useState<Info>({} as Info)
    
    const fetch = async () => {
        new HTTPResponse<Info>(await info())
        .onDockerClientUnavailable(setStore)
        .onSuccess(
            (d)=> { setData(d.payload??({} as Info)) }
        )
        .onFail((message) => {
            toast.error("Could not load the system informations : ", message)
        }) 
    }
    
    useEffect(() => {fetch()}, [])
   
    return(
            <>
                <div className="w-1/2 mx-auto">
                    <pre>{JSON.stringify(data, null, 4)}</pre>
                </div>
            </>
        )
}

export default HomeComponent