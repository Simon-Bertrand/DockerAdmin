'use client';

import { ArrowPathIcon, PauseIcon, PlayIcon, PlayPauseIcon, PowerIcon } from "@heroicons/react/24/solid";
import { ListBulletIcon, QueueListIcon } from "@heroicons/react/24/solid";
import {
  TabList,
  Tab,
  Card,
  ProgressBar,
  Flex,
  Text,
  Metric,
  Grid,
  BadgeDelta,
  DeltaType,
  Title,
  Italic,
} from "@tremor/react";
import Link from "next/link";

import { useEffect, useState } from "react";
import { useAppContext } from "../src/context/app";
import { Answer, HTTPResponse, HTTPResponseData } from "../src/fetchs/response";
import groupBy from "../src/utils/array";
import { detectTraefik, parseTraefikRouterRules } from "../src/utils/traefik";
import { parseContainerName, parseContainerState, parsePorts } from "../src/utils/docker";



export default function ContainersTable({httpResponseData} : {httpResponseData : HTTPResponseData<any>}) {

  const {store, setStore} = useAppContext()
  

  let data = null  as Answer<any>|null 


  new HTTPResponse(httpResponseData)
  .onDockerClientUnavailable(setStore)
  .onSuccess(ans => data = ans)


  const dataGrouped = data ? {
    ...groupBy(data.payload.filter((x) => 'com.docker.compose.config-hash' in x.Config.Labels), (x) => x.Config.Labels["com.docker.compose.project"]),
    ...groupBy(data.payload.filter((x) => !('com.docker.compose.config-hash' in x.Config.Labels)), (x) => x.Name)
  }:null


  const [tab, setTab] = useState("");



  return (
    dataGrouped 
    && 
    <Card>
      <>
        <Text>System's containers</Text>
        <Metric>System's containers</Metric>
        <TabList
          value={tab}
          onValueChange={setTab}
          className="mt-6"
        >
          {Object.keys(dataGrouped).map((x) =>{return <Tab value={x} text={x} />})}
        </TabList>
      </>
        <div className="mt-6">
         <Grid numColsSm={2} numColsLg={3} className="gap-6">
              {dataGrouped[tab] && dataGrouped[tab].map((item) => {
                const containerState = parseContainerState(item.State.Status)
                const defaultButtonColor = "text-gray-200 cursor-not-allowed"
                const ports = detectTraefik(item) ? parseTraefikRouterRules(item) : parsePorts(item)
                return (
                  <Card key={"ff"} decoration="top" decorationColor={containerState.decorationColor}>
                    <Flex alignItems="start">
                      <Italic>{item.Config.Image}</Italic>
                      <BadgeDelta deltaType={containerState.deltaType}>{item.State.Status}</BadgeDelta>
                    </Flex>
                    <Flex
                      justifyContent="start"
                      alignItems="baseline"
                      className="truncate space-x-3"
                    >
                      <Link href={`/containers/${parseContainerName(item)}`}><Title>{parseContainerName(item)}</Title></Link>
                      <Text className="truncate">
                        {ports}
                      </Text>
                    </Flex>
                    <Flex className="mt-5">
                      <PowerIcon className={ "h-6 w-6 " + (["running", "pause"].includes(item.State.Status)? "text-red-500 cursor-pointer":defaultButtonColor) } />
                      <PlayIcon className={ "h-6 w-6 " + (["paused", "exited"].includes(item.State.Status)? "text-green-500 cursor-pointer":defaultButtonColor) } />
                      <PauseIcon className={ "h-6 w-6 " + (["running"].includes(item.State.Status)? "text-orange-500 cursor-pointer":defaultButtonColor) } />
                      <ArrowPathIcon className={ "h-6 w-6 " + (["paused", "exited", "running"].includes(item.State.Status)? "text-blue-500 cursor-pointer":defaultButtonColor) } />
                      <ListBulletIcon className={"h-6 w-6 cursor-pointer"} />
                    </Flex>
                  </Card>
                )
                })
              }
          </Grid>
        </div>
    </Card>
  );
}
