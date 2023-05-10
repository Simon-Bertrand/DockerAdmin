import Fetch from "docker/fetch";
import { HTTPResponseData } from "docker/response";


export async function ping() : Promise<HTTPResponseData<null>> {
    return Fetch(`/ping`, {next : {revalidate : 0}, cache : 'no-store'})
}


