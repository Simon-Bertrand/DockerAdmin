'use client';

import { ArrowPathIcon, PauseIcon, PlayIcon, PlayPauseIcon, PowerIcon, ArrowDownIcon, ArrowUpIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
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
import groupBy from "../src/utils/array";
import { detectTraefik, parseTraefikRouterRules } from "../src/utils/traefik";
import { actionOnContainer } from "docker/client";
import { IContainers } from "docker/models";
import { parseContainerState, parsePortsList, parseContainerName } from "@/src/utils/docker";
import { HTTPResponseData, HTTPResponse, Answer, HTTPFetch } from "docker/response";
import { revalidateTag } from "next/cache";
import { getContainers } from "docker/api/containers";
import { toast } from "react-toastify";


export default function ContainersTable() {
  const {store, setStore} = useAppContext()
  const [data, setData] = useState<{ [x: string]: IContainers[]}>({})




  const [tab, setTab] = useState<string>("");


  const groupRawData = (ans : IContainers[])=> {
    return {
      ...groupBy(ans.filter((x) => 'com.docker.compose.config-hash' in x.Labels), (x) => x.Labels["com.docker.compose.project"]),
      ...groupBy(ans.filter((x) => !('com.docker.compose.config-hash' in x.Labels)), (x) => x.Names.join())
    }
  }
  const fetch = async () => {
      return new HTTPResponse<IContainers[]>(await getContainers())
      .onDockerClientUnavailable(setStore)
      .onSuccess(
        (d)=> {
          setData(groupRawData(d.payload))
        }
      )
      .onFail((message) => {
        toast.error("Could not fetch the containers : ", message)
      })
  }
 
  useEffect(() => {
    fetch()
    
  }, [])

  useEffect(()=> {
    if (Object.keys(data).length>0 && tab==="") { setTab(Object.keys(data)[0]) }
  })


    const getNumberOfContainers = ()=> {
        return Object.keys(data).map(x => data[x].length).reduce((prev, curr) => prev + curr,0)
    }
    const onActionContainer = (item : IContainers, action : "start" | "stop" | "restart" | "kill" | "update" | "pause" | "unpause" | "wait" | "attach") => {
      actionOnContainer(item.Names[0].replace("/", ""), action).then(x=>x)
      fetch()
    }

    
    return (
      Object.keys(data).length>0 && 
      <Card className="card-color-1">
        <>
          <h1>System</h1>
          <h5>{getNumberOfContainers()} detected containers</h5>
          <TabList
            value={tab}
            onValueChange={setTab}
            className="mt-6"
          >
            {Object.keys(data).map((x) =>{return <Tab value={x} text={x} />})}
          </TabList>
        </>
          <div className="mt-6">
          <Grid numColsSm={2} numColsLg={3} className="gap-6 ">
                {data[tab] && data[tab].map((item) => {
                  const containerState = parseContainerState(item.State)

                  let upDownArrow = null;
                  if (containerState.deltaType === "increase") {
                    upDownArrow = <ArrowUpIcon className="h-4" />
                  } else if (containerState.deltaType === "decrease") {
                    upDownArrow = <ArrowDownIcon className="h-4" />
                  } else {
                    upDownArrow = <ArrowRightIcon className="h-4" />
                  }
                  console.log({item})
                  const ports = detectTraefik(item) ? parseTraefikRouterRules(item) : parsePortsList(item)
                  return (
                    <Card key={"ff"} decoration="top" decorationColor={containerState.decorationColor} className="card-color-2">
                      <Flex alignItems="start">
                        <h6 className="w-3/4 italic">{item.Image}</h6>
                        <Flex className={`badge w-1/4 text-${containerState.decorationColor}-500`}>{upDownArrow}{item.State}</Flex>
                      </Flex>
                      <Flex
                        justifyContent="start"
                        alignItems="baseline"
                        className="truncate space-x-3"
                      >
                        <Link href={`/containers/${parseContainerName(item)}`}><h3>{parseContainerName(item)}</h3></Link>
                        <h5 className="truncate">
                          {ports}
                        </h5>
                      </Flex>
                      <Flex className="mt-5">
                        {
                        ["running"].includes(item.State)?
                          <PowerIcon className={ "h-6 w-6 text-emerald-500 cursor-not-allowed" } />
                        :
                        <button onClick={(e)=> onActionContainer(item, "start")}>
                          <PowerIcon className={ "h-6 w-6 text-red-500 cursor-pointer" } />
                        </button>
                        }
                        {["paused"].includes(item.State)?
                          <button onClick={(e)=> onActionContainer(item, "unpause")}>
                            <PlayIcon className={ "h-6 w-6 text-cyan-500 cursor-pointer"} />
                          </button>
                        :
                        null
                        }
                        {["running"].includes(item.State)?
                          <button onClick={(e)=> onActionContainer(item, "pause")}>
                            <PauseIcon className={ "h-6 w-6 text-cyan-500 cursor-pointer" } />
                          </button>
                        :
                        null
                        }
                        <ArrowPathIcon className={ "h-6 w-6 " + (["paused", "exited", "running"].includes(item.State)? "text-cyan-500 cursor-pointer":"text-red-500 cursor-not-allowed") } />
                        <ListBulletIcon className={"h-6 w-6 dark:text-white"} />
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

