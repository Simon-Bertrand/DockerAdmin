import { LinkIcon, MagnifyingGlassIcon, StarIcon } from "@heroicons/react/24/solid";
import { TextInput } from "@tremor/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { imagesApi } from "../api/get";
import { ISearchedImage } from "../models/ISearchedImage";

export function SearchBarComponent ({setModal} : {setModal : Dispatch<SetStateAction<{modal : string, data : object}>>}) {
    const [search, setSearch] = useState<string>("")
    const [showResults, setShowResults] = useState<ISearchedImage[]>([])

    useEffect(() => {
        const keyHandler = ({ keyCode }: any) => {
            if (keyCode !== 27) return;
            setSearch("")
            setShowResults([]) 
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });


    const searchQuery = (search : string) => {
        if (search === "") {
            setShowResults([])
        } else {
            if (search.trim() !== "" && search.trim().length >1) {
                imagesApi.searchDockerHubImages(
                    search, 
                    (data) => {
                        if ((data.payload?.length??0)>0) {
                            setShowResults(data.payload??[]) 
                        } 
                    })
            } else {
                setShowResults([]) 
            }
        }
    }
    

    useEffect(() => {
        const delayFn = setTimeout(() => searchQuery(search), 500);
        return () => clearTimeout(delayFn);
      }, [search]);

    return (
        <div className="relative py-2">
        
        <TextInput icon={MagnifyingGlassIcon} placeholder="Search an image on DockerHub..." value={search} onChange={(e) => setSearch(e.target.value) } onFocus={(e) => searchQuery(search)}  />
        {showResults.length > 0 && <div className="absolute w-full z-50">
            <div className="rounded-sm card-color-2 mt-1 ring-1 ring-stone-500">
                {showResults.map((x : ISearchedImage)  => {return (
                <>
                <div onClick={(e) => {setShowResults([]) ; setModal({modal : "dockerHubSelection", data : {name : x.name}});}} className="text-black dark:text-white py-1 px-4 flex justify-left items-center gap-2 overflow-hidden hover:bg-stone-700 cursor-pointer">
                    <b>{x.name}</b> :{" "}
                    <span className="text-stone-400 text-sm italic">{x.description}</span>
                    {x.star_count} <StarIcon height={18}></StarIcon>
                    <a className="flex items-center" href={`https://hub.docker.com/r/${x.name}`} target="_blank"  title="Check the image on Docker Hub">Hub <LinkIcon height={18}></LinkIcon></a>
                </div>
                <hr />
                </>
                )})}
            </div>
        </div>}
          
        </div>
    )



}