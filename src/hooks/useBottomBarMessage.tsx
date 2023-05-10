"use client";

import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { useAppContext } from "../context/app";

 


export default function useBottomBarMessage() {
    const {store, setStore} = useAppContext()

    const setBottomBarMessage = (message : string)=> {
        setStore(curr => { return {...curr, bottomBarMessage : message}})
    }

    return {
        bottomBarMessage : store.bottomBarMessage,
        setBottomBarMessage,
    }
}

