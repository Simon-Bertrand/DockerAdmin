'use client';
import {
    Text,
    Card,
    Col,
    Grid,
    Metric,
    Title,
    Callout,
    Flex,
    Bold,
    Button

  } from "@tremor/react";

import { ArrowPathIcon, ExclamationTriangleIcon} from "@heroicons/react/24/solid";

import { useAppContext } from "../context/app";
import { toast } from "react-toastify";
import { HTTPFetch, HTTPResponse } from "docker/response";
import { ping } from "docker/api/utils";

export const DisconnectedComponent : React.FunctionComponent<any> = () : JSX.Element  => {
        const {store, setStore} = useAppContext()
        const Retry = async () => {
            new HTTPResponse(await HTTPFetch(ping))
            .onSuccess(data => setStore(curr => {return{...curr, connected:true }}))
            .onFail((message : string) => toast.error(message))
        }
        return(
        <>
        <div className="flex justify-center items-center h-full">
        <Card className="max-w-md bg-red-100 card-color-1">
            <Flex justifyContent="start">
                <ExclamationTriangleIcon className="text-red-800 h-12 mr-3" />
                <Bold>An error occured :</Bold>
            </Flex>
            <h3 className="w-full text-center">Docker socket is unreachable</h3>
            <p className="w-full text-center !text-stone-500 pt-2">Is it currently running on your system ? </p>
            
            <Flex justifyContent="end" className="space-x-2 pt-2">
                <Button color="red" variant="primary" icon={ArrowPathIcon} onClick={Retry}>
                Retry
                </Button>
            </Flex>
        </Card>
        </div>
        </>)
}

export default DisconnectedComponent