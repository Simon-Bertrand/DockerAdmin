

export interface IContainer {
    AppArmorProfile: string;
    Args:            string[];
    Config: {
            AttachStderr: boolean;
            AttachStdin:  boolean;
            AttachStdout: boolean;
            Cmd:          string[];
            Domainname:   string;
            Entrypoint:   null;
            Env:          string[];
            Hostname:     string;
            Image:        string;
            Labels:       { [key: string]: string };
            OnBuild:      null;
            OpenStdin:    boolean;
            StdinOnce:    boolean;
            Tty:          boolean;
            User:         string;
            Volumes: {
                [key:string]: object;
            }
            ;
            WorkingDir:   string;
    };
    Created:         string;
    Driver:          string;
    ExecIDs:         null;
    GraphDriver: {
        Data: {
            LowerDir:  string;
            MergedDir: string;
            UpperDir:  string;
            WorkDir:   string;
        };
        Name: string;
    };
    HostConfig: {
        AutoRemove:           boolean;
        Binds:                any[];
        BlkioDeviceReadBps:   null;
        BlkioDeviceReadIOps:  null;
        BlkioDeviceWriteBps:  null;
        BlkioDeviceWriteIOps: null;
        BlkioWeight:          number;
        BlkioWeightDevice:    null;
        CapAdd:               null;
        CapDrop:              null;
        Cgroup:               string;
        CgroupParent:         string;
        CgroupnsMode:         string;
        ConsoleSize:          number[];
        ContainerIDFile:      string;
        CpuCount:             number;
        CpuPercent:           number;
        CpuPeriod:            number;
        CpuQuota:             number;
        CpuRealtimePeriod:    number;
        CpuRealtimeRuntime:   number;
        CpuShares:            number;
        CpusetCpus:           string;
        CpusetMems:           string;
        DeviceCgroupRules:    null;
        DeviceRequests:       null;
        Devices:              null;
        Dns:                  any[];
        DnsOptions:           any[];
        DnsSearch:            any[];
        ExtraHosts:           any[];
        GroupAdd:             null;
        IOMaximumBandwidth:   number;
        IOMaximumIOps:        number;
        IpcMode:              string;
        Isolation:            string;
        Links:                null;
        LogConfig:            {
            Config: object;
            Type:   string;
        };
        MaskedPaths:          string[];
        Memory:               number;
        MemoryReservation:    number;
        MemorySwap:           number;
        MemorySwappiness:     null;
        Mounts: {
            Source:        string;
            Target:        string;
            Type:          string;
            VolumeOptions: object;
        }[];
        NanoCpus:             number;
        NetworkMode:          string;
        OomKillDisable:       boolean;
        OomScoreAdj:          number;
        PidMode:              string;
        PidsLimit:            null;
        PortBindings:         object;
        Privileged:           boolean;
        PublishAllPorts:      boolean;
        ReadonlyPaths:        string[];
        ReadonlyRootfs:       boolean;
        RestartPolicy: {
            MaximumRetryCount: number;
            Name:              string;
        };
        Runtime:              string;
        SecurityOpt:          null;
        ShmSize:              number;
        UTSMode:              string;
        Ulimits:              null;
        UsernsMode:           string;
        VolumeDriver:         string;
        VolumesFrom:          null;
    };
    HostnamePath:    string;
    HostsPath:       string;
    Id:              string;
    Image:           string;
    LogPath:         string;
    MountLabel:      string;
    Mounts:          {
        Destination: string;
        Driver:      string;
        Mode:        string;
        Name:        string;
        Propagation: string;
        RW:          boolean;
        Source:      string;
        Type:        string;
    }[];
    Name:            string;
    NetworkSettings: {
        Bridge:                 string;
        EndpointID:             string;
        Gateway:                string;
        GlobalIPv6Address:      string;
        GlobalIPv6PrefixLen:    number;
        HairpinMode:            boolean;
        IPAddress:              string;
        IPPrefixLen:            number;
        IPv6Gateway:            string;
        LinkLocalIPv6Address:   string;
        LinkLocalIPv6PrefixLen: number;
        MacAddress:             string;
        Networks: {
            [key:string]: {
                Aliases:             string[];
                DriverOpts:          null;
                EndpointID:          string;
                Gateway:             string;
                GlobalIPv6Address:   string;
                GlobalIPv6PrefixLen: number;
                IPAMConfig:          null;
                IPAddress:           string;
                IPPrefixLen:         number;
                IPv6Gateway:         string;
                Links:               null;
                MacAddress:          string;
                NetworkID:           string;
            }
        };
        Ports:                  object;
        SandboxID:              string;
        SandboxKey:             string;
        SecondaryIPAddresses:   null;
        SecondaryIPv6Addresses: null;
    };
    Path:            string;
    Platform:        string;
    ProcessLabel:    string;
    ResolvConfPath:  string;
    RestartCount:    number;
    State: {
        Dead:       boolean;
        Error:      string;
        ExitCode:   number;
        FinishedAt: string;
        OOMKilled:  boolean;
        Paused:     boolean;
        Pid:        number;
        Restarting: boolean;
        Running:    boolean;
        StartedAt:  string;
        Status:     string;
    };
}

export interface IContainers {
    Command: string,
    Created: number,
    HostConfig: {
      NetworkMode: string
    },
    Id: string,
    Image: string,
    ImageID: string,
    Labels: {[key:string]:string},
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
    State: "running"|"paused"|"exited",
    Status: string
}

export interface Info {
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