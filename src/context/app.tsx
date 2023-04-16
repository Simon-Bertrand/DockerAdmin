'use client';

import { SetStateAction, createContext, useContext, useState, Dispatch } from "react";

export interface AppContextSchema {
    connected : boolean
}


const AppContext = createContext(
    { 
        store: {} as AppContextSchema,
        setStore : {} as Dispatch<SetStateAction<AppContextSchema>>
    }
)

export const AppContextProvider = ({ children} : {children : JSX.Element}) => {
    const [store, setStore] = useState({
        connected: true
    } as AppContextSchema);

    return (
        <AppContext.Provider value={{ store, setStore }}>
            {children}
        </AppContext.Provider>
    )
};

export const useAppContext = () => useContext(AppContext);