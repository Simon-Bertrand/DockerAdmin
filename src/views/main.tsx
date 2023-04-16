'use client';
import React from "react";
import {useAppContext} from "../context/app";
import DisconnectedComponent from "./disconnected";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const MainComponent : React.FunctionComponent<any> = ({ children }) : JSX.Element  => {
    const {store, setStore} = useAppContext();
    console.log(store)

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
            theme="dark"
            limit={3}
            />
        </>
    )
}


export default MainComponent