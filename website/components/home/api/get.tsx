"use client";

import Info from "../models/Info";
import { Dispatch, SetStateAction } from "react";
import { AppContextSchema } from "../../../globals/context/app";
import { cacheSocketIO, pingSocketIO } from "@src/hooks/useSocketIO";


export const homeApi = {
    getInfo: () => cacheSocketIO<Info>("info", "info"),
    getPing: (setStore : Dispatch<SetStateAction<AppContextSchema>>) => pingSocketIO(setStore),
}
