
export default interface Info {
    Architecture: string
    BridgeNfIp6tables: boolean
    BridgeNfIptables: boolean
    CPUSet: boolean
    CPUShares: boolean
    CgroupDriver: string
    CgroupVersion: string
    ContainerdCommit: {
        Expected: string
        ID: string
      }
    Containers: number
    ContainersPaused: number
    ContainersRunning: number
    ContainersStopped: number
    CpuCfsPeriod: boolean
    CpuCfsQuota: boolean
    Debug: boolean
    DefaultRuntime: string
    DockerRootDir: string
    Driver: string
    DriverStatus: string[][]
    ExperimentalBuild: boolean
    GenericResources: any
    HttpProxy: string
    HttpsProxy: string
    ID: string
    IPv4Forwarding: boolean
    Images: number
    IndexServerAddress: string
    InitBinary: string
    InitCommit: {
        Expected: string
        ID: string
      }
    Isolation: string
    KernelMemoryTCP: boolean
    KernelVersion: string
    Labels: any[]
    LiveRestoreEnabled: boolean
    LoggingDriver: string
    MemTotal: number
    MemoryLimit: boolean
    NCPU: number
    NEventsListener: number
    NFd: number
    NGoroutines: number
    Name: string
    NoProxy: string
    OSType: string
    OSVersion: string
    OomKillDisable: boolean
    OperatingSystem: string
    PidsLimit: boolean
    Plugins: {
        Authorization: any
        Log: string[]
        Network: string[]
        Volume: string[]
      }
    RegistryConfig: {
        AllowNondistributableArtifactsCIDRs: any
        AllowNondistributableArtifactsHostnames: any
        IndexConfigs:  {
            [k:string]: {
                Mirrors: any[]
                Name: string
                Official: boolean
                Secure: boolean
              }
          }
        InsecureRegistryCIDRs: string[]
        Mirrors: any
      }
    RuncCommit: {
        Expected: string
        ID: string
      }
    Runtimes: {
        [k:string]: { path: string }
      }
    SecurityOptions: string[]
    ServerVersion: string
    SwapLimit: boolean
    Swarm: {
        ControlAvailable: boolean
        Error: string
        LocalNodeState: string
        NodeAddr: string
        NodeID: string
        RemoteManagers: any
      }
    SystemTime: string
    Warnings: string[]
  }