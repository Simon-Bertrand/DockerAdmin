"use client";
import { homeApi } from "components/home/api/get"
import { SpinnerComponent } from "components/home/widgets/Spinner"
import { imagesApi } from "../api/get";
import { SearchBarComponent } from "../widgets/SearchBar";
import { Card, Grid } from "@tremor/react";
import { IImages } from "../models/IImages";
import { convertFileSize } from "utils/maths";
import { CloudIcon, EllipsisHorizontalIcon, EllipsisVerticalIcon, LinkIcon, PlayIcon, TrashIcon } from "@heroicons/react/24/solid";
import { GenericModalComponent } from "components/home/widgets/GenericModal";
import { SetStateAction, useState } from "react";
import { DockerHubSelectedComponent } from "../widgets/DockerHubSelected";
import { ImageDetailsComponent } from "../widgets/ImageDetails";

export const ImagesHomeComponent: React.FunctionComponent = (): JSX.Element => {
    const {payload : images} = imagesApi.getImages()
    const [modal, setModal] = useState<{modal : string, data : object}>({"modal":"", "data":{}})


    return (
        <>
            <SearchBarComponent setModal={setModal} />
            {images!==null ? 
                <Grid numCols={2} className="gap-3 m-3 overflow-hidden">
                    {images?.map((x : IImages) =>
                    <Card className="card-color-1">
                        <div className="flex justify-between">
                            <div>
                                <h3><b>{x.RepoTags}</b></h3>
                                <h5>Created : {new Date(x.Created*1000).toDateString()}</h5>
                                <h5>Size : {convertFileSize(x.Size)}</h5>
                            </div>
                            <div className="flex h-1/2 gap-1">
                                <button className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-1 px-2 rounded flex items-center gap-1">
                                    <PlayIcon title="Run" height={18}></PlayIcon>
                                </button>
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded flex items-center gap-1">
                                    <TrashIcon title="Delete" height={18}></TrashIcon>
                                </button>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded flex items-center gap-1">
                                    <CloudIcon title="Pull" height={18}></CloudIcon>
                                </button>
                                <button onClick={(e) => {setModal({modal:"inspectImage", data:{name : x.RepoTags}})}} className="bg-stone-500 hover:bg-stone-700 text-white font-bold py-1 px-2 rounded flex items-center gap-1">
                                    <EllipsisVerticalIcon title="Inspect" height={18}></EllipsisVerticalIcon>
                                </button>
                            </div>
                        </div>
                    </Card>
                    )}
                </Grid>
            : <SpinnerComponent />
            }


            {modal.modal === "dockerHubSelection" && <DockerHubSelectedComponent modal={modal} setModal={setModal}/>}
            {modal.modal === "inspectImage" && <ImageDetailsComponent modal={modal} setModal={setModal}/>}


        </>
    )
}

export default ImagesHomeComponent