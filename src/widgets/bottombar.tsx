"use client";
import { useSession } from "next-auth/react";
import { useAppContext } from "../context/app"
import useBottomBarMessage from "../hooks/useBottomBarMessage";



export default function BottomBar() {
    const {store, setStore} = useAppContext()
    const session = useSession()
    const {setBottomBarMessage, bottomBarMessage} = useBottomBarMessage()
    return (
        <section id="bottom-navigation" className="block fixed inset-x-0 bottom-0 z-10 bg-dockeradmin-lightgrey_secondary  dark:bg-dockeradmin-darkgrey_secondary shadow">
            <div id="tabs" className="flex justify-between text-black dark:text-white font-serif text-xs py-1 px-3">
                <div>{bottomBarMessage===""? "":">>"} {bottomBarMessage}</div>
                <div>Env. : <span className="text-stone-500">{process.env.NODE_ENV}</span> - User : <span className="text-stone-500">{session.data?.user.login} ({session.status})</span></div>
                <div className='flex items-center space-x-1'>
                    <div>System state :</div>
                    <div className={`bg-${store.connected ? "green":"red"}-500 h-3 w-3 rounded-full`}> </div>
                    <div className='text-stone-500'>{store.connected ? "Connected":"Disconnected"}</div>
                </div>
            </div>
        </section>
    )
}
