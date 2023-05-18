"use client";
import React, { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';

import { socket } from "../socket/connection";
import Info from "../models/Info";
import { Answer } from "../../../utils/fetch";
import { SpinnerComponent } from "../widgets/Spinner";
import { homeApi } from "../api/get";



export const HomeComponent: React.FunctionComponent = (): JSX.Element => {
    const {payload} = homeApi.getInfo()
    return (
        <>
            <div className="w-1/2 mx-auto">
                <pre className="text-black dark:text-white">{JSON.stringify(payload, null, 4)}</pre>
            </div>
        </>
    )
}

export default HomeComponent