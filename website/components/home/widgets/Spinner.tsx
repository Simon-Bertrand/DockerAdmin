
export const SpinnerComponent : React.FunctionComponent<{text?:string, bgColor? : string, size?:string, sizeIn?:string}> = ({text,size, bgColor, sizeIn}) : JSX.Element  => {

    return(
        <div className="flex justify-center items-center  rounded-sm p-2">
            <div className={`flex h-${size??"7"} w-${size??"7"} items-center justify-center rounded-full animate-spin bg-gradient-to-tr from-blue-900 to-blue-500`}>
                <div className={`h-${sizeIn??"4"} w-${sizeIn??"4"} rounded-full ${bgColor??"bgcolor"}`}></div>
            </div>
            <span className='mx-2 ruda font-medium text-lg text-blue-500'>
                {"  "} {text??"Loading ..."}
            </span>
        </div>
      
        
    )
}
