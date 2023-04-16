'use client';

import { ArrowPathIcon, CalculatorIcon, CheckCircleIcon, CubeIcon, CubeTransparentIcon, ExclamationCircleIcon, PauseIcon, UserIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";

import {
  TabList,
  Tab,
  Card,
  Flex,
  Text,
  Metric,
  Grid,
  Title,
  Bold,
  CategoryBar,
  Icon,
  List,
  ListItem,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Divider,
  DonutChart,
  SelectBox,
  SelectBoxItem,
  Dropdown,
  DropdownItem,
  Callout,
} from "@tremor/react";

import { useEffect, useState } from "react";
import { socket } from "../src/socket/core";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { detectTraefik, parsePorts, parseTraefikRouterRules } from "./containerstable";
import { SpinnerComponent } from "../src/widgets/spinner/loading";

const round = (value : number, precision : number) => {
  return Math.floor((value * Math.pow(10,precision)))/Math.pow(10,precision)
}
function shortenString(value : string, max : number) {
  return value.length<=max ? value : (value.slice(0,max)+"...")
}

function convertFileSize(bytes : number, si=false, dp=1) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }

  const units = si 
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] 
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  const r = 10**dp;

  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


  return bytes.toFixed(dp) + ' ' + units[u];
}

//{[key:string] : JSX.Element}
const PageMap =  (container) =>  {
  return {
    "infos" : <InformationsContainersDetails {...{container}} ></InformationsContainersDetails>,
    "env" : <EnvironmentContainersDetails {...{container}}></EnvironmentContainersDetails>,
    "logs" : <LogsContainersDetails {...{container}}></LogsContainersDetails>,
    "stats" : <StatisticsContainersDetails {...{container}}></StatisticsContainersDetails>,
  }
}


export default function ContainersDetails({ container }: { container: any }) {
  const [selectedView, setSelectedView] = useState("");
  
  return (
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

export function InformationsContainersDetails({ container }: { container: any }) {
  console.log(container)
  const [labelSelected , setLabelSelected] = useState("")
  const [networkSelected , setNetworkSelected] = useState(Object.keys(container.NetworkSettings.Networks)[0])

  return (
    <>
    <Grid numColsMd={2} numColsLg={3} className="gap-6 mt-6">
      <Card className="max-w-md mx-auto" decoration="top" decorationColor={container.State.Status === "running"?"green":"gray"}>
        <Flex justifyContent="start">
          <Text>
            <Bold>State</Bold>
          </Text>
        </Flex>

        <Flex className="mt-2">
          <div>
            <Flex
              alignItems="baseline"
              justifyContent="start"
              className="space-x-2"
            >
            
              <Text>Status :</Text>
              <Text className="uppercase">&nbsp;<Bold>{container.State.Status}</Bold></Text>
              {container.State.Status === "running" && <div className="flex justify-center items-center h-full">
                  <div className="flex justify-center items-center  rounded-sm p-2">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full animate-spin bg-gradient-to-tr from-green-900 to-green-500">
                          <div className="h-3 w-3 rounded-full bg-white "></div>
                      </div>
            
                  </div>
              </div>}
              {container.State.Status === "exited" && <div className="flex justify-center items-center h-full">
                 <XMarkIcon className="text-red-500"></XMarkIcon>
              </div>}
              {container.State.Status === "paused" && <div className="flex justify-center items-center h-full">
                 <PauseIcon className="text-orange-500"></PauseIcon>
              </div>}
              
            </Flex>
          </div>
          <Text>PID : <Bold>{container.State.Pid} ({container.State.ExitCode})</Bold></Text>
        </Flex>
    
          
         
          <Flex justifyContent="between" className="mt-4">
          <Bold>Running</Bold>&nbsp;{container.State.Running?
          <CheckCircleIcon className="h-5 text-green-500"></CheckCircleIcon>
          :
          <XCircleIcon className="h-5 text-red-500"></XCircleIcon>
          
          }
         
          <Bold>Paused</Bold>&nbsp;{container.State.Paused?
          <CheckCircleIcon className="h-5 text-green-500"></CheckCircleIcon>
          :
          <XCircleIcon className="h-5 text-red-500"></XCircleIcon>
          }
          
          <Bold>Dead</Bold>&nbsp;{container.State.Dead?
          <CheckCircleIcon className="h-5 text-green-500"></CheckCircleIcon>
          :
          <XCircleIcon className="h-5 text-red-500"></XCircleIcon>
          }
        
          </Flex>
          <Flex justifyContent="between">
          <Bold>Restarting</Bold>&nbsp;{container.State.Restarting?
          <CheckCircleIcon className="h-5 text-green-500"></CheckCircleIcon>
          :
          <XCircleIcon className="h-5 text-red-500"></XCircleIcon>
          }
          
          <Bold>OOM Killed</Bold>&nbsp;{container.State.OOMKilled?
          <CheckCircleIcon className="h-5 text-green-500"></CheckCircleIcon>
          :
          <XCircleIcon className="h-5 text-red-500"></XCircleIcon>
          }
          </Flex>

      {container.State.Error !== "" && <Callout
        className="h-12 mt-4"
        title="Critical speed limit reached"
        icon={ExclamationTriangleIcon}
        color="rose"
      >
        {container.State.Error}
      </Callout>
      }
      </Card>
 
      <Card className="max-w-md mx-auto">
        <Flex justifyContent="start">
          <Text>
            <Bold>Entity</Bold>
          </Text>
         
        </Flex>

        <List className="mt-2">
          <ListItem>
            <div>
              <Text>
                <Bold>Name :</Bold> {container.Name}
              </Text>
              <Text>
                <Bold>Args :</Bold> {container.Args.join(' ')}
              </Text>
              <Text>
                <Bold>Id :</Bold> <span title={container.Id}>{shortenString(container.Id,30)}</span>
              </Text>
              <Text>
                <Bold>Image :</Bold> <span title={container.Image}>{shortenString(container.Image,30)}</span>
              </Text>
              <Text>
                <Bold>Restart Count :</Bold> {container.RestartCount}
              </Text>
            </div>
          </ListItem>

        </List>
      </Card>
      <Card className="max-w-md mx-auto">
        <Flex justifyContent="start">
          <Text>
            <Bold>Config</Bold>
          </Text>
         
        </Flex>

        <List className="mt-4">
          <ListItem>
            <div>
              <Text>
                <Bold>Image :</Bold> {container.Config.Image}
              </Text>
    
            </div>
          </ListItem>
        </List>
        <Flex>
          <Text><Bold>Labels : </Bold></Text>
          <Dropdown
              className="mt-2 w-3/4"
              placeholder="Select a label"
              onValueChange={setLabelSelected} 
              value={labelSelected}
            >
              {
              Object.keys(container.Config.Labels).map((x,i) => {
                return  <DropdownItem value={x} title={x} text={x} icon={CubeTransparentIcon} />
              })
              
              }              
          </Dropdown>
          </Flex>
          {labelSelected!=="" && <span title={container.Config.Labels[labelSelected]}><Text className="text-center mt-2" >{shortenString(container.Config.Labels[labelSelected],45)}</Text></span>}
              
      </Card>

      <Card className="max-w-md mx-auto">
        <Flex justifyContent="start">
          <Text>
            <Bold>Host Config</Bold>
          </Text>
         
        </Flex>

        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell> Name </TableHeaderCell>
              <TableHeaderCell className="text-right"> Value </TableHeaderCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Object.keys(container.HostConfig).map((x,i) => (
              <TableRow key={i.toString()}>
                <TableCell>{x}</TableCell>
                <TableCell className="text-right">{JSON.stringify(container.HostConfig[x])}</TableCell>
               
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Card className="max-w-md mx-auto">
        <Flex justifyContent="between">
          <Text>
            <Bold>Network</Bold>
          </Text>
          <Dropdown
              className="mt-2 w-3/4"
              onValueChange={setNetworkSelected} 
              value={networkSelected}
            >
              {
              Object.keys(container.NetworkSettings.Networks).map((x,i) => {
                return  <DropdownItem value={x} title={x} text={x} icon={CubeTransparentIcon} />
              })
              
              }              
          </Dropdown>

        </Flex>

        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell> Name </TableHeaderCell>
              <TableHeaderCell className="text-right"> Value </TableHeaderCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Object.keys(container.NetworkSettings.Networks[networkSelected]).filter((x) => ["Gateway", "IPAddress", "MacAddress"].includes(x)).map((x,i) => (
              <TableRow key={i.toString()}>
                <TableCell>{x}</TableCell>
                <TableCell className="text-right">{container.NetworkSettings.Networks[networkSelected][x]}</TableCell>
               
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Card className="max-w-md mx-auto">
        <Flex justifyContent="start">
          <Text>
            <Bold>Service's domains</Bold>
          </Text>
         
        </Flex>

        <List className="mt-4">
          <ListItem>
              {(detectTraefik(container) ? parseTraefikRouterRules(container) : parsePorts(container))}
          </ListItem>
        </List>
              
      </Card>
    </Grid>
    </>
  )
}

export function EnvironmentContainersDetails({ container }: { container: any }) {
  return (
    <>
     <Grid numColsMd={1} numColsLg={1} className="gap-6 mt-6">
      <Card className="max-w-2xl mx-auto w-full">
        <Flex>
        <Title>Environment variables</Title>
        <Text>{container.Name} (#{shortenString(container.Id,30)})</Text>
        <Text>{container.Config.Image}</Text>
        </Flex>
        <Divider />
        <Table className="mt-5">
          <TableHead>
            <TableRow>
              <TableHeaderCell className="text-center uppercase">Name</TableHeaderCell>
              <TableHeaderCell className="text-center uppercase">Value</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {container.Config.Env.map((x) => x.split("=")).map((x) => {
            return <TableRow key={"item.name"}>
              <TableCell className="text-center" title={x[0]}>{x[0]}</TableCell>
              <TableCell className="text-center" title={x[1]}>{shortenString(x[1],45)}</TableCell>
            </TableRow>
            
            })}
          </TableBody>
        </Table>
      </Card>
    </Grid>

    </>
  )
}

export function LogsContainersDetails({ container }: { container: any }) {
  const [textAeraValue,setTextAeraValue] = useState<Array<String>>([])

  useEffect(() => {
    socket.emit("subscribe_logs", container.Name)
    socket.on('logs', (data) => {
      console.log("received logs event : ", data)
      setTextAeraValue(curr => [data, ...curr])
    });

    return () => {
      socket.emit("unsubscribe_logs", container.Name)
      socket.off("logs")
    }
  }, [])

  

  return (
    <>
      <Grid numColsMd={1} numColsLg={1} className="gap-6 mt-6  h-fit ">
      <Card className="bg-gray-800 text-white h-96 overflow-y-auto font-mono">
          {textAeraValue.length >0 && textAeraValue.map((x)=> <p><b>&gt;&gt;&gt;</b> {x}</p>)}
      </Card>
      </Grid>
  
    </>
  )
}

export function StatisticsContainersDetails({container}) {
  const [stats, setStats] = useState<any>({})
  useEffect(() => {
    socket.emit("subscribe_stats", container.Name)
    socket.on('stats', (data) => {
      setStats(data)
      console.log("data,",data)
    });
    return () => {
      socket.emit("unsubscribe_stats", container.Name)
      socket.off("stats")
    }
  }, [])
  let cpu_usage = null
  let cpu_use = null
  let cpu_total_use = null
  let memory_usage = null

  if(Object.keys(stats).length !== 0) {
    cpu_use = stats.cpu_stats.cpu_usage.total_usage - stats.precpu_stats.cpu_usage.total_usage
    cpu_total_use = stats.cpu_stats.system_cpu_usage - stats.precpu_stats.system_cpu_usage
    cpu_usage = round(100*cpu_use/cpu_total_use *stats.cpu_stats.online_cpus, 4)
    memory_usage = round(100*(stats.memusage_usage)/(stats.memusage_total),4)
    if (cpu_usage>1) { cpu_usage=100}
  }
  const valueFormatter = (number: number) => `${Intl.NumberFormat("us").format(number).toString()} %`;
  return (
    <>
    <Grid numColsMd={1} numColsLg={1} className="gap-6 mt-6">
      {(Object.keys(stats).length !== 0 && container.State.Running === "running" && <Card className="max-w-2xl mx-auto w-full">

        <Flex>
        <Title>Statistics</Title>
        <Text>{container.Name} (#{container.Id.slice(0,16)}...)</Text>
        <Text>Image : {container.Config.Image}</Text>
        </Flex>
        <Divider />

        <Flex className="justify-around">
          <Text className="uppercase">CPU Usage</Text>
          <Text className="uppercase">Memory Usage</Text>

         
        </Flex>
        <Flex className="justify-around">
          <Text>({(cpu_usage??0)} %)</Text>
          <Text>({(memory_usage??0)} %)</Text>
        </Flex>

        <Flex>
        <DonutChart
        className="mt-4"
        data={[{ name: "CPU Used", value: cpu_usage??0, }, { name: "Free CPU", value: (100-(cpu_usage??0)), }]}
        category="value"
        index="name"
        variant="pie"
        valueFormatter={valueFormatter}
        colors={["blue", "gray"]}
        />
        <DonutChart
        className="mt-4"
        data={[{ name: "Memory Used", value: (memory_usage??0), }, { name: "Free memory", value: (100 - (memory_usage??0)), }]}
        category="value"
        index="name"
        variant="pie"
        valueFormatter={valueFormatter}
        colors={["blue", "gray"]}
        />
        
        </Flex>

        <Flex className="justify-around">
          <Text>{(convertFileSize(cpu_use??0))} / {convertFileSize((cpu_total_use??0))}</Text>
          <Text>{(convertFileSize(stats.memusage_usage??0))} / {convertFileSize((stats.memusage_total??0))}</Text>
        </Flex>

       
        <Divider />

        <Text>Network usage</Text>
     
        <Flex className="justify-around">
        <Metric>{convertFileSize(stats.netio_input??"")}</Metric>
        <Metric>{convertFileSize(stats.netio_output??"")}</Metric>
        </Flex>
        <Flex className="justify-around">
        <Text>Inputs</Text>
        <Text>Output</Text>
        </Flex>
        <Divider />
        <Text>Disk usage</Text>
        <Flex className="justify-around">
        <Metric>{convertFileSize(stats.blockio_input??"")}</Metric>
        <Metric>{convertFileSize(stats.blockio_output??"")}</Metric>
        </Flex>
        <Flex className="justify-around">
        <Text>Inputs</Text>
        <Text>Output</Text>
        </Flex>
      </Card>) || <SpinnerComponent />}

      {container.State.Status !== "running" &&  <Callout
        className="h-12 mt-4"
        title="Nothing to show"
        icon={ExclamationCircleIcon}
        color="rose"
      >
        The container is not running
      </Callout>}
      
    </Grid>
    
    </>
  )
}



