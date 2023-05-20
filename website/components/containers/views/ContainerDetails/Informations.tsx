import { XMarkIcon, PauseIcon, CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon, CubeTransparentIcon } from "@heroicons/react/24/solid"

import { Grid, Card, Flex, Bold, Callout, List, ListItem, Dropdown, DropdownItem, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell } from "@tremor/react"
import { parsePortsDetail } from "components/containers/utils/docker"
import { detectTraefik, parseTraefikRouterRules } from "components/containers/utils/traefik"
import { useState } from "react"
import { shortenString } from "utils/string"

export function InformationsComponent({ container }: { container: any }) {
  const [labelSelected, setLabelSelected] = useState("")
  const [networkSelected, setNetworkSelected] = useState(Object.keys(container.NetworkSettings.Networks)[0])
  return (
    <>
      <Grid numColsMd={2} numColsLg={3} className="gap-6 mt-6">
        <Card className="max-w-md mx-auto card-color-1" decoration="top" decorationColor={container.State === "running" ? "green" : "gray"}>
          <Flex justifyContent="start">
            <h4>
              <Bold>State</Bold>
            </h4>
          </Flex>

          <Flex className="mt-2">
            <div>
              <Flex
                alignItems="baseline"
                justifyContent="start"
                className="space-x-2"
              >

                <h4>Status :</h4>
                <h4 className="uppercase">&nbsp;<Bold>{container.State.Status}</Bold></h4>
                {container.State.Status === "running" && <div className="flex justify-center items-center h-full">
                  <div className="flex justify-center items-center  rounded-sm p-2">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full animate-spin bg-gradient-to-tr from-green-900 to-green-500">
                      <div className="h-3 w-3 rounded-full bg-white dark:bg-stone-800 "></div>
                    </div>

                  </div>
                </div>}
                {container.State === "exited" && <div className="flex justify-center items-center h-full">
                  <XMarkIcon className="text-red-500"></XMarkIcon>
                </div>}
                {container.State === "paused" && <div className="flex justify-center items-center h-full">
                  <PauseIcon className="text-orange-500"></PauseIcon>
                </div>}

              </Flex>
            </div>
            <h4>PID : <Bold>{container.State.Pid} ({container.State.ExitCode})</Bold></h4>
          </Flex>



          <Flex justifyContent="between" className="mt-4">
            <Bold>Running</Bold>&nbsp;{container.State.Running ?
              <CheckCircleIcon className="h-5 text-green-500"></CheckCircleIcon>
              :
              <XCircleIcon className="h-5 text-red-500"></XCircleIcon>

            }

            <Bold>Paused</Bold>&nbsp;{container.State.Paused ?
              <CheckCircleIcon className="h-5 text-green-500"></CheckCircleIcon>
              :
              <XCircleIcon className="h-5 text-red-500"></XCircleIcon>
            }

            <Bold>Dead</Bold>&nbsp;{container.State.Dead ?
              <CheckCircleIcon className="h-5 text-green-500"></CheckCircleIcon>
              :
              <XCircleIcon className="h-5 text-red-500"></XCircleIcon>
            }

          </Flex>
          <Flex justifyContent="between">
            <Bold>Restarting</Bold>&nbsp;{container.State.Restarting ?
              <CheckCircleIcon className="h-5 text-green-500"></CheckCircleIcon>
              :
              <XCircleIcon className="h-5 text-red-500"></XCircleIcon>
            }

            <Bold>OOM Killed</Bold>&nbsp;{container.State.OOMKilled ?
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

        <Card className="max-w-md mx-auto card-color-1">
          <Flex justifyContent="start">
            <h5>
              <Bold>Entity</Bold>
            </h5>

          </Flex>

          <List className="mt-2">
            <ListItem>
              <div>
                <h5>
                  <Bold>Name :</Bold> {container.Name}
                </h5>
                <h5>
                  <Bold>Args :</Bold> {container.Args.join(' ')}
                </h5>
                <h5>
                  <Bold>Id :</Bold> <span title={container.Id}>{shortenString(container.Id, 30)}</span>
                </h5>
                <h5>
                  <Bold>Image :</Bold> <span title={container.Image}>{shortenString(container.Image, 30)}</span>
                </h5>
                <h5>
                  <Bold>Restart Count :</Bold> {container.RestartCount}
                </h5>
              </div>
            </ListItem>

          </List>
        </Card>
        <Card className="max-w-md mx-auto card-color-1">
          <Flex justifyContent="start">
            <Bold>Config</Bold>
          </Flex>

          <List className="mt-4">
            <ListItem>
              <h5>
                <Bold>Image :</Bold> {container.Config.Image}
              </h5>
            </ListItem>
          </List>
          <Flex>
            <Bold>Labels : </Bold>
            <Dropdown
              className="mt-2 w-3/4"
              placeholder="Select a label"
              onValueChange={setLabelSelected}
              value={labelSelected}
            >
              {
                Object.keys(container.Config.Labels).map((x, i) => {
                  return <DropdownItem value={x} title={x} text={x} icon={CubeTransparentIcon} />
                })

              }
            </Dropdown>
          </Flex>
          {labelSelected !== "" && <span title={container.Config.Labels[labelSelected]}><Text className="text-center mt-2" >{shortenString(container.Config.Labels[labelSelected], 45)}</Text></span>}

        </Card>

        <Card className="max-w-md mx-auto card-color-1">
          <Flex justifyContent="start">
            <Bold>Host Config</Bold>
          </Flex>

          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell> Name </TableHeaderCell>
                <TableHeaderCell className="text-right"> Value </TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(container.HostConfig).filter(x => ["AutoRemove"].includes(x)).map((x, i) => (
                <TableRow key={i.toString()}>
                  <TableCell>{x}</TableCell>
                  <TableCell className="text-right">{JSON.stringify(container.HostConfig[x])}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <Card className="max-w-md mx-auto card-color-1">
          <Flex justifyContent="between">
            <Bold>Network</Bold>
            <Dropdown
              className="mt-2 w-3/4"
              onValueChange={setNetworkSelected}
              value={networkSelected}
            >
              {
                Object.keys(container.NetworkSettings.Networks).map((x, i) => {
                  return <DropdownItem value={x} title={x} text={x} icon={CubeTransparentIcon} />
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
              {Object.keys(container.NetworkSettings.Networks[networkSelected]).filter((x) => ["Gateway", "IPAddress", "MacAddress"].includes(x)).map((x, i) => (
                <TableRow key={i.toString()}>
                  <TableCell>{x}</TableCell>
                  <TableCell className="text-right">{container.NetworkSettings.Networks[networkSelected][x]}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <Card className="max-w-md mx-auto card-color-1">
          <Flex justifyContent="start">
            <Bold>Service's domains</Bold>
          </Flex>

          <List className="mt-4">
            <ListItem>
              {(detectTraefik(container) ? parseTraefikRouterRules(container) : parsePortsDetail(container))}
            </ListItem>
          </List>

        </Card>
      </Grid>
    </>
  )
}
