
"use server";
import Fetch from "../fetch";

export async function getContainers()  {
    return Fetch("/containers/json?all=True", {next : {revalidate : 0}, cache : 'no-store'})
}

export async function getContainer(name_or_id : string)  {
    return Fetch(`/containers/${name_or_id}/json`, {next : {revalidate : 0}, cache : 'no-store'})
}

