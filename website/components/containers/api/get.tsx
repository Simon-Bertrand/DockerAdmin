
"use client";


import { useSocketIO, useSocketIOSubscription } from "@src/hooks/useSocketIO";
import IContainer from "../models/IContainer";
import IContainers from "../models/IContainers";


export const containersApi = {
    getContainers: () => useSocketIO<IContainers[]>("containers"),
    getContainer : (name_or_id : string) => useSocketIO<IContainer>("container", name_or_id),
    subscribeLogs : (name_or_id : string) => useSocketIOSubscription<any>("logs", name_or_id),
    subscribeStats : (name_or_id : string) => useSocketIOSubscription<any>("stats", name_or_id),
}
