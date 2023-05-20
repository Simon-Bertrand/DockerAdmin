'use client';
import {
  TabList,
  Tab,
} from "@tremor/react";
import { useState } from "react";
import IContainer from "../../models/IContainer";
import { InformationsComponent } from "./Informations";
import { StatisticsComponent } from "./Statistics";
import { LogsComponent } from "./Logs";
import { EnvironmentComponent } from "./Environment";
import { containersApi } from "components/containers/api/get";
import { SpinnerComponent } from "components/home/widgets/Spinner";


const PageMap = (container: IContainer) : {[key:string] : JSX.Element} => {
  return {
    "infos": <InformationsComponent {...{ container }} ></InformationsComponent>,
    "env": <EnvironmentComponent {...{ container }}></EnvironmentComponent>,
    "logs": <LogsComponent {...{ container }}></LogsComponent>,
    "stats": <StatisticsComponent {...{ container }}></StatisticsComponent>,
  }
}

export default function ContainerDetailsComponent({ name_or_id }: { name_or_id: string }) {
  const { payload: container } = containersApi.getContainer(name_or_id)
  const [selectedView, setSelectedView] = useState("infos");
  if (container === undefined) { return <SpinnerComponent /> }
  return (
    Object.keys(container).length > 0 &&
    <>
      <TabList
        value={selectedView}
        onValueChange={setSelectedView}
        className="mt-6"
      >
        <Tab value="infos" text="Informations" />
        <Tab value="env" text="Environment" />
        <Tab value="logs" text="Logs" />
        {container.State.Status === "running" ? <Tab value="stats" text="Statistics" /> : <></>}
      </TabList>
      {PageMap(container)[selectedView]}
    </>
  );

}




