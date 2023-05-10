import Fetch from "docker/fetch";
import { Info } from "docker/models";
import { HTTPResponseData } from "docker/response";


export async function info() : Promise<HTTPResponseData<Info>> {
    return Fetch(`/info`, {next : {revalidate : 0}, cache : 'no-store'})
}


