
"use client";


import { useSocketIO, useSocketIOStateless} from "@src/hooks/useSocketIO";
import { IImages } from "../models/IImages";
import { ISearchedImage } from "../models/ISearchedImage";
import { Answer } from "utils/fetch";


export const imagesApi = {
    getImages: () => useSocketIO<IImages[]>("images"),
    searchDockerHubImages: (search : string, ack : (data: Answer<ISearchedImage[]>) =>  void) => useSocketIOStateless("images_search", search, ack),
    //getImage : (name_or_id : string) => useSocketIO<IContainer>("container", name_or_id),
}
