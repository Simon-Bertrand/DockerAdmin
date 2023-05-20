'use client';
import React from "react";
import {useAppContext} from "../../../globals/context/app";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useDarkTheme from "../../../globals/hooks/useDarkTheme";
import ErrorComponent from "./Error";
import { homeApi } from "../api/get";
import { socket } from "../../../globals/socket/connection";
import { Answer } from "utils/fetch";


export const MainComponent : React.FunctionComponent<any> = ({ children }) : JSX.Element  => {
    const {store, setStore} = useAppContext();
    const [isDarkTheme, changeDarkTheme] = useDarkTheme()

    return (
        <>
            {store.connected?children:<ErrorComponent title={"Docker socket is unreachable"} question={"Are you sure it is running on your system ?"} retryFunc={() => homeApi.getPing(setStore)}/>}
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