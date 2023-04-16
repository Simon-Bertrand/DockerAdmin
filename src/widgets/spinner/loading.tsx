
export const SpinnerComponent : React.FunctionComponent = () : JSX.Element  => {

    return(
        <div className="flex justify-center items-center  rounded-sm p-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full animate-spin bg-gradient-to-tr from-blue-900 to-blue-500">
                <div className="h-4 w-4 rounded-full bg-white "></div>
            </div>
            <span className='mx-2 ruda font-medium text-lg text-blue-500'>
                {"  "} Loading ...
            </span>
        </div>
      
        
    )
}