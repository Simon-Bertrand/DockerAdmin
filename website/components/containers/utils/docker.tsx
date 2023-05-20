import Link from "next/link"
import IContainer from "../models/IContainer"
import IContainers from "../models/IContainers"

export const parsePortsDetail = (container : IContainers) => {
    return Object.keys(container.NetworkSettings.Ports)
    .filter((x) => container.NetworkSettings.Ports[x] !== null)
    .map((x) => x.split('/')[0])
    .map((x) => <Link href={"http://localhost:" + x} target="_blank">{x}</Link>)
    .reduce((prev, curr) => [prev, ':', curr], [])
}

export const parsePortsList = (container : IContainers) => {
  return container.Ports
  .map((x) => x.PrivatePort)
  .map((x) => <Link href={"http://localhost:" + x} target="_blank">{x}</Link>)
  .reduce((prev, curr) => [prev, ':', curr], [])
}
  
export const detectDockerCompose = (container : IContainers) => {
    return "com.docker.compose.config-hash" in container.Labels
  }
  
export const parseContainerName = (container : IContainers) => container.Names.join(", ").slice(1)
export const parseContainerState = (containerState : string) => {
    switch (containerState) {
      case "running" : return {"decorationColor" : "emerald", "deltaType":"increase"}
      case "paused" : return {"decorationColor" : "orange", "deltaType":"unchanged"}
      case "exited" : return {"decorationColor" : "red", "deltaType":"decrease"}
      default : return {}
    }
  }