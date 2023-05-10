'use client';
import {
    Text,
    Card,
    Col,
    Grid,
    Metric,
    Title,
    Callout,
    Flex,
    Bold,
    Button

  } from "@tremor/react";

import { ArrowPathIcon, ExclamationTriangleIcon} from "@heroicons/react/24/solid";
export const ErrorComponent : React.FunctionComponent<{ title: string; question: string; retryFunc? : ()=>void}> = ({title, question, retryFunc}) : JSX.Element  => {
    console.log("Hello")    
    return(
            <>
                <div className="flex justify-center items-center h-full">
                    <Card className="max-w-md bg-red-900 bg-opacity-40 ring-0">
                        <Flex justifyContent="start">
                            <ExclamationTriangleIcon className="text-red-500 h-12 mr-3" />
                            <Bold className=" dark:text-stone-300">An error occured :</Bold>
                        </Flex>
                        <h2 className="w-full text-center dark:text-red-100 text-lg">{title}</h2>
                        <p className="w-full text-center pt-2 dark:text-stone-300">{question}</p>
                        
                        <Flex justifyContent="end" className="space-x-2 pt-2">

              
                        </Flex>
                    </Card>
                </div>
            </>
        )
}

export default ErrorComponent