import Link from "next/link"

export const parsePorts = (container) => {
    return Object.keys(container.NetworkSettings.Ports)
    .filter((x) => container.NetworkSettings.Ports[x] !== null)
    .map((x) => x.split('/')[0])
    .map((x) => <Link href={"http://localhost:" + x} target="_blank">{x}</Link>)
    .reduce((prev, curr) => [prev, ':', curr], [])
}
  
export const detectDockerCompose = (container) => {
    return "com.docker.compose.config-hash" in container.Config.Labels
  }
  
export const parseContainerName = (container) => container.Name.slice(1)
export const parseContainerState = (containerState) => {
    switch (containerState) {
      case "running" : return {"decorationColor" : "emerald", "deltaType":"increase"}
      case "paused" : return {"decorationColor" : "orange", "deltaType":"unchanged"}
      case "exited" : return {"decorationColor" : "red", "deltaType":"decrease"}
      default : return {}
    }
  }