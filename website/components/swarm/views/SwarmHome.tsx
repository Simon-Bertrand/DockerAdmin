"use client";
import { homeApi } from "components/home/api/get"
import ErrorComponent from "components/home/views/Error";
import { SpinnerComponent } from "components/home/widgets/Spinner"

export const SwarmHomeComponent: React.FunctionComponent = (): JSX.Element => {
    const {cache : info, refetch} = homeApi.getInfo()
    if (info===null) { return <SpinnerComponent />}
    if (new Date().getTime() - new Date(info.SystemTime).getTime() > 5*60*60*1000) {
        refetch()
    }

    if (info.Swarm.LocalNodeState === "inactive") {
        return <ErrorComponent title={"The Docker swarm mode is inactive"} question={"Please enable it to be able to access this page"}></ErrorComponent>
    }
    return (
        <>
            <div className="w-1/2 mx-auto p-5">
                <pre className="text-black dark:text-white">{JSON.stringify(info, null, 4)}</pre>
            </div>
        </>
    )
}

export default SwarmHomeComponent