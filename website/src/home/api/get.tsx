"use client";

import { pingSocketIO, useSocketIO, useSocketIOStateless, useSocketIOSubscription } from "@src/home/hooks/useSocketIO";
import Info from "../models/Info";
import { Answer } from "utils/fetch";
import { Dispatch, SetStateAction } from "react";
import { AppContextSchema } from "../context/app";



export const homeApi = {
    getInfo: () => useSocketIO<Info>("info"),
    getPing: (setStore : Dispatch<SetStateAction<AppContextSchema>>) => pingSocketIO(setStore),
}
