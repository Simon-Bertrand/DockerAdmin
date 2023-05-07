import Fetch from "docker/fetch";

export async function ping()  {
    return await Fetch("/ping", {cache : "no-store"})
}