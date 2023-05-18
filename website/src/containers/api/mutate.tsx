"use client";
import { useSocketIO, useSocketIOStateless } from "@src/home/hooks/useSocketIO";
import { Answer } from "utils/fetch";

export const containersMutationApi = {
    actionOnContainer: (name_or_id : string, action : string, ack : (data : Answer<undefined>) => void ) => useSocketIOStateless("containers_actions", name_or_id, action, ack),
}
