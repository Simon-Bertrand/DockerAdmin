
"use client";


import { useSocketIO} from "@src/hooks/useSocketIO";
import ISwarm from "../models/ISwarm";


export const swarmApi = {
    getSwarm: () => useSocketIO<ISwarm>("swarm"),
}
