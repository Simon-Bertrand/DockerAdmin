'use client';
import { SessionProvider, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { useLocalStorage } from "usehooks-ts";

export const AppWrapper : React.FunctionComponent<any> = ({ children }) : JSX.Element  => {
    const [isDarkTheme, setDarkTheme] = useLocalStorage('themeMode', "true")

    useEffect(() => {
        if (isDarkTheme==="true") { 
            document.documentElement.classList.add("dark") 
        }
        else { document.documentElement.classList.remove("dark") }
    }, [])

    return (
        <>
        <SessionProvider>
            {children}
        </SessionProvider>
        </>
    )
}


export default AppWrapper