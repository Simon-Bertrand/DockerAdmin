interface Container {
    "Id" : string,
    "Created" : string,
    "Args" : string[],
    "State" : 
        {
            'Status': string,
            'Running': boolean, 
            'Paused': boolean, 
            'Restarting': boolean, 
            'OOMKilled': boolean, 
            'Dead': boolean, 
            'Pid': number, 
            'ExitCode': number, 
            'Error': string, 
            'StartedAt': string, 
            'FinishedAt': string
        },
    "Image": string,
    "Name": string,
    "RestartCount": string,
    "Driver": string,
    "MountLabel": string,
    "Config" : {
    "Labels": object
    }
}
