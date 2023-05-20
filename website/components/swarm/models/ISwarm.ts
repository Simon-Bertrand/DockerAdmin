export default interface ISwarm {
    ID: string;
    Version: {
        Index: number;
    }
    CreatedAt: Date;
    UpdatedAt: Date;
    Spec: {
        Name: string;
        Labels: {
            [key: string]: string;
        };
        Orchestration: {
            TaskHistoryRetentionLimit: number;
        };
        Raft: {
            SnapshotInterval: number;
            KeepOldSnapshots: number;
            LogEntriesForSlowFollowers: number;
            ElectionTick: number;
            HeartbeatTick: number;
        };
        Dispatcher: {
            HeartbeatPeriod: number;
        };
        CAConfig: {
            NodeCertExpiry: number;
            ExternalCAs: {
                Protocol: string;
                URL: string;
                Options: {
                    property1: string;
                    property2: string;
                };
                CACert: string;
            }[];
            SigningCACert: string;
            SigningCAKey: string;
            ForceRotate: number;
        };
        EncryptionConfig: {
            AutoLockManagers: boolean;
        };
        TaskDefaults: {
            LogDriver: {
                Name: string;
                Options: {
                    "max-file": string;
                    "max-size": string;
                };
            };
        };
    };
    TLSInfo: {
        TrustRoot: string;
        CertIssuerSubject: string;
        CertIssuerPublicKey: string;
    };
    RootRotationInProgress: boolean;
    DataPathPort: number;
    DefaultAddrPool: Array<string[]>;
    SubnetSize: number;
    JoinTokens: {
        Worker: string;
        Manager: string;
    };
}


