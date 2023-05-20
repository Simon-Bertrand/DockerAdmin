import { PlayIcon, CloudIcon, LinkIcon } from "@heroicons/react/24/solid";
import { GenericModalComponent } from "components/home/widgets/GenericModal";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

export function DockerHubSelectedComponent ({modal, setModal} : {modal : {modal : string, data : object}, setModal : Dispatch<SetStateAction<{modal : string, data : object}>>}) {
    return <GenericModalComponent 
    modalTitle={"DockerHub : " + modal.data.name} 
    setModalOpen={() =>null} 
    onConfirm={() => null} 
    onCancel={() => setModal(curr => { return {data : {}, modal : ""}})} 
    style={{"bgColor" : "card-color-2"}}
    >
    <>
    <h5>The name of the selected Image</h5>
    <div className="w-full space-y-2">
        <button title ="Run the DockerHub image" className="w-full bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-1 px-2 rounded flex items-center gap-1">
            <PlayIcon title="Run" height={18}></PlayIcon>
            Run
        </button>
        <button title ="Pull the DockerHub image"  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded flex items-center gap-1">
            <CloudIcon title="Pull" height={18}></CloudIcon>
            Pull
        </button>
        <button title ="Visite the DockerHub image website"  className="w-full bg-stone-500 hover:bg-stone-700 text-white font-bold py-1 px-2 rounded flex items-center gap-1">
            <Link href={`https://hub.docker.com/r/${modal.data.name}`} target="_blank" className="flex">
                <LinkIcon title="Visit" height={18}></LinkIcon>
                DockerHub
            </Link>
        </button>
    </div>
    </>
    </GenericModalComponent>
}