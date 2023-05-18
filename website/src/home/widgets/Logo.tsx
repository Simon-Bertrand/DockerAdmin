'use client';

import { Flex } from "@tremor/react";
import { leagueSpartan } from "../fonts/register";
import useDarkTheme from "../hooks/useDarkTheme";
import DarkLogo from "@src/home/logo/dark-dockeradmin.svg"
import Logo from "@src/home/logo/dockeradmin.svg"


function LogoComponent({ justifyContent, fontSize }: { justifyContent: "center" | "start" | "end" | "between" | "around" | "evenly" | undefined, fontSize: string }) {
    const [isDarkTheme, setDarkTheme] = useDarkTheme()
    const logo = isDarkTheme ? <DarkLogo /> : <Logo />
    return (
        <>
            <Flex justifyContent={justifyContent} className="select-none">
                <div className="pr-1">{logo}</div>
                <span className={`${leagueSpartan.className} ${fontSize} items-center`}>dockeradmin</span>
            </Flex>
        </>
    )
}
export default LogoComponent