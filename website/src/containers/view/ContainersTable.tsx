'use client';


import { useSocketIO } from "@src/home/hooks/useSocketIO";
import groupBy from "utils/groupby";
import { ArrowPathIcon, PauseIcon, PlayIcon, PowerIcon, ArrowDownIcon, ArrowUpIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { ListBulletIcon } from "@heroicons/react/24/solid";
import {
  TabList,
  Tab,
  Card,
  Flex,
  Grid,
} from "@tremor/react";
import Link from "next/link";
import { useState } from "react";
import IContainers from "../models/IContainers";
import { parseContainerState, parsePortsList, parseContainerName } from "../utils/docker";

import { detectTraefik, parseTraefikRouterRules } from "../utils/traefik";
import { SpinnerComponent } from "@src/home/widgets/Spinner";
import { containersApi } from "../api/get";
import { containersMutationApi } from "../api/mutate";
import { toast } from "react-toastify";



export default function ContainersTableComponent() {
  const { payload, isLoading, refetch } = containersApi.getContainers()
  const [tab, setTab] = useState<string>("");

  const groupRawData = (ans: IContainers[]) => {
    return {
      ...groupBy(ans.filter((x) => 'com.docker.compose.config-hash' in x.Labels), (x) => x.Labels["com.docker.compose.project"]),
      ...groupBy(ans.filter((x) => !('com.docker.compose.config-hash' in x.Labels)), (x) => x.Names.join())
    }
  }


  if (payload !== undefined) {
    let data = groupRawData(payload)

    const getNumberOfContainers = () => {
      return Object.keys(data).map(x => data[x].length).reduce((prev, curr) => prev + curr, 0)
    }
    const onActionContainer = async (e, item: IContainers, action: "start" | "stop" | "restart" | "kill" | "update" | "pause" | "unpause" | "wait" | "attach") => {

      e.target.classList.add("animate-pulse")
      e.target.classList.add("overflow-visible")
      const onclick_save = e.target.onclick
      e.target.onclick = null
      e.target.classList.replace("cursor-pointer", "cursor-not-allowed")

      containersMutationApi.actionOnContainer(item.Names[0].replace("/", ""), action,
        (action_data) => {
          if (action_data.state == 1) {
            toast.success("Successfully mutated the container")
            setTimeout(() => {
              refetch()
            }, 500)
          } else {
            toast.error(`Failed to mutate the container : ${action_data.message}`)
            e.target.classList.remove("animate-pulse")
            e.target.classList.remove("overflow-visible")
            e.target.onclick = onclick_save
            e.target.classList.replace("cursor-not-allowed", "cursor-pointer")
          }
        })

    }
    return (
      Object.keys(data).length > 0 &&
      <Card className="card-color-1">
        <>
          <h1>System</h1>
          <h5>{getNumberOfContainers()} detected containers</h5>
          <TabList
            value={tab}
            onValueChange={setTab}
            className="mt-6"
          >
            {Object.keys(data).map((x) => { return <Tab value={x} text={x} /> })}
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
                      ["running"].includes(item.State) ?
                        <button onClick={(e) => onActionContainer(e, item, "stop")}>
                          <PowerIcon className={"h-6 w-6 text-emerald-400 cursor-pointer"} />
                        </button>
                        :
                        <button onClick={(e) => onActionContainer(e, item, "start")}>
                          <PowerIcon className={"h-6 w-6 text-red-500 cursor-pointer"} />
                        </button>
                    }
                    {["paused"].includes(item.State) ?
                      <button onClick={(e) => onActionContainer(e, item, "unpause")}>
                        <PlayIcon className={"h-6 w-6 text-cyan-500 cursor-pointer"} />
                      </button>
                      :
                      null
                    }
                    {["running"].includes(item.State) ?
                      <button onClick={(e) => onActionContainer(e, item, "pause")}>
                        <PauseIcon className={"h-6 w-6 text-cyan-500 cursor-pointer"} />
                      </button>
                      :
                      null
                    }
                    {["exited"].includes(item.State) ?
                      <PlayIcon className={"h-6 w-6 text-stone-500 cursor-not-allowed"} />
                      :
                      null
                    }
                    <ArrowPathIcon className={"h-6 w-6 " + (["paused", "exited", "running"].includes(item.State) ? "text-cyan-500 cursor-pointer" : "text-red-500 cursor-not-allowed")} />
                    <Link href={`/containers/${parseContainerName(item)}`}>
                      <ListBulletIcon className={"h-6 w-6 dark:text-white"} />
                    </Link>
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
  else { return <SpinnerComponent /> }
}

