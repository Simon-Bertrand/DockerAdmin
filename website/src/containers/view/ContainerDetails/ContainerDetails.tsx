'use client';


import { useSocketIO, useSocketIOSubscription } from "@src/home/hooks/useSocketIO";
import { SpinnerComponent } from "@src/home/widgets/Spinner";
import { CheckCircleIcon, CubeTransparentIcon, ExclamationCircleIcon, ExclamationTriangleIcon, PauseIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";

import {
  TabList,
  Tab,
  Card,
  Flex,
  Text,
  Grid,
  Bold,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Divider,
  DonutChart,
  Dropdown,
  DropdownItem,
  Callout,
} from "@tremor/react";
import { useState } from "react";
import IContainer from "../../models/IContainer";
import { InformationsComponent } from "./Informations";
import { StatisticsComponent } from "./Statistics";
import { LogsComponent } from "./Logs";
import { EnvironmentComponent } from "./Environment";
import { containersApi } from "@src/containers/api/get";


const PageMap = (container : IContainer ) => {
  return {
    "infos": <InformationsComponent {...{ container }} ></InformationsComponent>,
    "env": <EnvironmentComponent {...{ container }}></EnvironmentComponent>,
    "logs": <LogsComponent {...{ container }}></LogsComponent>,
    "stats": <StatisticsComponent {...{ container }}></StatisticsComponent>,
  }
}

export default function ContainerDetailsComponent({ name_or_id }: { name_or_id: string }) {
  const [selectedView, setSelectedView] = useState("");

  const { payload: container } = containersApi.getContainer(name_or_id)
  if (container !== undefined) {
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
  } else {  return <SpinnerComponent /> }

}




