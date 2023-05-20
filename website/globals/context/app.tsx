'use client';

import Info from "components/home/models/Info";
import { SetStateAction, createContext, useContext, useState, Dispatch } from "react";

export interface AppContextSchema {
    connected : boolean
    bottomBarMessage : string
    info : Info|null
}


const AppContext = createContext(
    { 
        store: {} as AppContextSchema,
        setStore : {} as Dispatch<SetStateAction<AppContextSchema>>
    }
)

export const AppContextProvider = ({ children} : {children : JSX.Element}) => {
    const [store, setStore] = useState({
        connected: true,
        bottomBarMessage : "",
        info : null
    } as AppContextSchema);

    return (
        <AppContext.Provider value={{ store, setStore }}>
            {children}
        </AppContext.Provider>
    )
};

export const useAppContext = () => useContext(AppContext);