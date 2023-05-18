'use client';
import { SessionProvider, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';

export const AppWrapper : React.FunctionComponent<any> = ({children }) : JSX.Element  => {
    return (
        <>
            <SessionProvider>
                {children}
            </SessionProvider>
        </>
    )
}


export default AppWrapper