import { useAppContext } from "@/src/context/app";
import HomeComponent from "@/src/views/home";
import { getContainers } from "docker/api/containers";
import { info } from "docker/api/info";
import { IContainers, Info } from "docker/models";
import { HTTPResponse } from "docker/response";
import { toast } from "react-toastify";

export default async function HomePage() {


    return <HomeComponent />

}
