'use client';
import React from "react";
import {useAppContext} from "../context/app";
import DisconnectedComponent from "./disconnected";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useDarkTheme from "../hooks/useDarkTheme";

export const MainComponent : React.FunctionComponent<any> = ({ children }) : JSX.Element  => {
    const {store, setStore} = useAppContext();

    const [isDarkTheme, changeDarkTheme] = useDarkTheme()
    return (
        <>
            {store.connected?children:<DisconnectedComponent />}
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