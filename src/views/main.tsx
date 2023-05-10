'use client';
import React from "react";
import {useAppContext} from "../context/app";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useDarkTheme from "../hooks/useDarkTheme";
import ErrorComponent from "@/src/views/error";
import { ping } from "docker/api/utils";
import { HTTPResponse } from "docker/response";

export const MainComponent : React.FunctionComponent<any> = ({ children }) : JSX.Element  => {
    const {store, setStore} = useAppContext();

    const [isDarkTheme, changeDarkTheme] = useDarkTheme()
    const Retry = async () => {
        return new HTTPResponse<null>(await ping())
        .onSuccess(
          (d)=> {
            setStore(curr => {return{...curr, connected:true }})
            
          }
        )
        .onFail((message) => {
          toast.error(message)
        })
    }
    return (
        <>
            {store.connected?children:<ErrorComponent title={"Docker socket is unreachable"} question={"Are you sure it is running on your system ?"} retryFunc={Retry} />}
            <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={isDarkTheme ?"dark":"light"}
            limit={3}
            />
        </>
    )
}


export default MainComponent