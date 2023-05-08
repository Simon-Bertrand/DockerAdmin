
"use server";
import { IContainer, IContainers } from "docker/models";
import { HTTPResponse, HTTPResponseData } from "docker/response";
import Fetch from "../fetch";

export async function getContainers() : Promise<HTTPResponseData<IContainers[]>> {
    return Fetch("/containers/json?all=True", {next : {revalidate : 0, tags : ["containers"]}, cache : 'no-store'})
}

export async function getContainer(name_or_id : string) : Promise<HTTPResponseData<IContainer>> {
    return Fetch(`/containers/${name_or_id}/json`, {next : {revalidate : 0, tags : ["container", name_or_id]}, cache : 'no-store'})
}



