"use client";

import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

 


export default function useDarkThemeHook() {
    if (typeof window !== "undefined") {
        const [isDarkTheme, setDarkTheme] = useLocalStorage('themeMode', document.documentElement.classList.contains("dark")?"true":"false")

        const setBodyClass = ()=> {
            let cl = document.documentElement.classList
            if (isDarkTheme=="true" && !cl.contains("dark")) { 
                cl.add("dark")
            } 
            if (isDarkTheme=="false" && cl.contains("dark")) {
                cl.remove("dark")
            }
        
        }
        const changeDarkTheme = () => {
            setDarkTheme(curr => curr === "true" ? "false":"true")
        }

        useEffect(() => {
            setBodyClass()
        }, [isDarkTheme]);
    

        return [isDarkTheme =="true" ? true : false, changeDarkTheme] as [boolean, () => null]
    } else {
        return []
    }
}

