export default interface IContainers {
  Command: string,
  Created: number,
  HostConfig: {
    NetworkMode: string
  },
  Id: string,
  Image: string,
  ImageID: string,
  Labels: { [key: string]: string },
  Mounts: {
    Destination: string,
    Driver: string,
    Mode: string,
    Name: string,
    Propagation: string,
    RW: boolean,
    Source: string,
    Type: string
  }[]
  ,
  Names: string[],
  NetworkSettings: {
    Networks: {
      bridge: {
        Aliases: any,
        DriverOpts: any,
        EndpointID: string,
        Gateway: string,
        GlobalIPv6Address: string,
        GlobalIPv6PrefixLen: number,
        IPAMConfig: any,
        IPAddress: string,
        IPPrefixLen: number,
        IPv6Gateway: string,
        Links: any,
        MacAddress: string,
        NetworkID: string
      }
    }
  },
  Ports: {
    PrivatePort: number,
    Type: string
  }[],
  State: "running" | "paused" | "exited",
  Status: string
}