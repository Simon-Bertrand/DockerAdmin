'use client';
import { CloudIcon } from "@heroicons/react/24/solid";
import { Flex } from "@tremor/react";
import { leagueSpartan } from "../fonts/register";
import DarkLogo from "@/src/logo/dark-dockeradmin.svg"
import Logo from "@/src/logo/dockeradmin.svg"
import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

export default function LogoComponent({justifyContent, size} : {justifyContent :  "center" | "start" | "end" | "between" | "around" | "evenly" | undefined, size : "md"|"lg"}) {
    let h, fs
    if (size == "md") {
        h = 6
        fs = "xl"
    }
    if (size == "lg") {
        h = 6
        fs = "2xl"
        
    }
    const [isDarkTheme, setDarkTheme] = useLocalStorage('themeMode', "true")

    const logo = isDarkTheme === "true"? <DarkLogo/>:<Logo />


    return(
        <Flex justifyContent={justifyContent}>
           
            <div className="pr-1">{logo}</div>
            <span className={`${leagueSpartan.className} text-${fs} items-center`}>dockeradmin</span>
        </Flex>
    )
}

