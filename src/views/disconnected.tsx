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
import { HTTPFetch, HTTPResponse } from "../fetchs/response";
import { UtilsApi } from "../fetchs/api/utils";
import { useAppContext } from "../context/app";
import { toast } from "react-toastify";

export const DisconnectedComponent : React.FunctionComponent<any> = () : JSX.Element  => {
        const {store, setStore} = useAppContext()
        const Retry = async () => {
            new HTTPResponse(await HTTPFetch(UtilsApi.ping))
            .onSuccess(data => setStore(curr => {return{...curr, connected:true }}))
            .onFail((message : string) => toast.error(message))
            console.log(store)
        }
        return(
        <>
        <div className="flex justify-center items-center h-full">
        <Card className="max-w-md bg-red-100">
            <Flex justifyContent="start">
                <ExclamationTriangleIcon className="text-red-800 h-12 mr-3" />
                <Bold>An error occured :</Bold>
            </Flex>
            <Title className="w-full text-center">Docker socket is unreachable</Title>
            <Text className="w-full text-center pt-2">Is it currently running on your system ? </Text>
            
            <Flex justifyContent="end" className="space-x-2 pt-2">
                <Button color="red" variant="secondary" icon={ArrowPathIcon} onClick={Retry}>
                Retry
            </Button>
            </Flex>
        </Card>
        </div>
        </>)
}

export default DisconnectedComponent