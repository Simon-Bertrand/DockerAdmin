"use client";
import React, { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { Card, Col, Grid, MarkerBar, Metric, ProgressBar } from "@tremor/react";
import { socket } from "../../../globals/socket/connection";
import Info from "../models/Info";
import { Answer } from "../../../utils/fetch";
import { SpinnerComponent } from "../widgets/Spinner";
import { homeApi } from "../api/get";
import { ArchiveBoxIcon, ArrowPathIcon, CloudIcon, CpuChipIcon, PhotoIcon } from "@heroicons/react/24/solid";
import { convertFileSize } from "utils/maths";



export const HomeComponent: React.FunctionComponent = (): JSX.Element => {
    const {cache : info, refetch} = homeApi.getInfo()
    if (info===null) { return <SpinnerComponent />}
    if (new Date().getTime() - new Date(info.SystemTime).getTime() > 5*60*60*1000) {
        refetch()
    }
    return (
        <>
            <div className="w-1/2 mx-auto p-5">
                <div className="p-2">
                    <h1 className="text-center uppercase">
                        {info?.Name}
                    </h1>
                    <h5 className="text-center uppercase"> 
                        ({info?.Architecture} - {info?.OSType}) 
                    </h5>
                </div>
                <div className="flex justify-end w-full p-3">
                    <ArrowPathIcon onClick={refetch} height={24} className="text-stone-500 cursor-pointer" title="Reload the information"/>
                </div>
                <Card className="card-color-1 p-2 flex justify-center dark:text-white text-black items-center space-x-5 gap-1">
                    <CpuChipIcon height={32} />{info?.NCPU??"?"} CPU(s)
                    <ArchiveBoxIcon height={32} />{convertFileSize(info?.MemTotal)??"?"} Memory
                    <CloudIcon height={32} />{info?.Containers??"?"} Container(s)
                    <PhotoIcon height={32} />{info?.Images??"?"} Image(s)
                </Card>

                <Grid numCols={2} numColsSm={2} numColsLg={2} className="gap-2 my-2">
                    <Card className="card-color-1 text-center ">
                        <h4>Containers Running</h4>
                        <div className="flex justify-center items-center gap-1">
                            <b className="text-xl">{info?.ContainersRunning??"?"}</b>
                            <span className="text-sm dark:text-white text-black">({Math.floor(100 * info.ContainersRunning/info.Containers)} %)</span>
                        </div>
                        <ProgressBar percentageValue={Math.floor(100 * info.ContainersRunning/info.Containers)} color="emerald" className="mt-1" />
                    </Card>
                    <Card className="card-color-1 text-center items-center">
                        <h4>System time</h4>
                        <b className="text-xl">{new Date(info?.SystemTime).toLocaleTimeString()??"?"}</b>
                    </Card>
                    <Card className="card-color-1 text-center ">
                        <h4>Containers Stopped</h4>
                        <div className="flex justify-center items-center gap-1">
                            <b className="text-xl">{info?.ContainersStopped??"?"}</b>
                            <span className="text-sm dark:text-white text-black">({Math.floor(100 * info.ContainersStopped/info.Containers)} %)</span>
                        </div>
                        <ProgressBar percentageValue={Math.floor(100 * info.ContainersStopped/info.Containers)} color="red" className="mt-1" />
                    </Card>
                    <Card className="card-color-1 text-center ">
                        <h4>Swarm</h4>
                        <b className="text-xl uppercase">{info?.Swarm.LocalNodeState??"?"}</b>
                    </Card>
                    <Card className="card-color-1 text-center ">
                        <h4>Containers Paused</h4>
                        <div className="flex justify-center items-center gap-1">
                            <b className="text-xl">{info?.ContainersPaused??"?"}</b>
                            <span className="text-sm dark:text-white text-black">({Math.floor(100 * info.ContainersPaused/info.Containers)} %)</span>
                        </div>
                        <ProgressBar percentageValue={Math.floor(100 * info.ContainersPaused/info.Containers)} color="orange" className="mt-1" />
                    </Card>
                    <Card className="card-color-1 flex justify-center items-center">
                        <span className="flex justify-center gap-1 space-x-8">
                            <div>
                                <b>Debug</b>
                                <ToggleLight state={info?.Debug??false} />
                            </div>
                            <div>
                                <b>MemoryLimit</b>
                                <ToggleLight state={info?.MemoryLimit??false} />
                            </div>
                            <div>
                                <b>IPv4Forwarding</b>
                                <ToggleLight state={info?.IPv4Forwarding??false} />
                            </div>
                        </span>
                   
                    </Card>
                </Grid>
                {/* <pre className="text-black dark:text-white">{JSON.stringify(info, null, 4)}</pre> */}
            </div>
        </>
    )
}

export default HomeComponent


const ToggleLight = ({state} : {state : boolean}) => {
    const color = state? "emerald":"red"
    return <div className={`bg-${color}-500 rounded-full h-4 w-4 ring-2 ring-${color}-800 mx-auto`}></div>
}