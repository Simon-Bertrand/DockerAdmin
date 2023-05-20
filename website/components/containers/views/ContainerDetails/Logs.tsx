
import { Grid, Card } from "@tremor/react"
import { containersApi } from "components/containers/api/get"
import IContainer from "components/containers/models/IContainer"

export function LogsComponent({ container }: { container: IContainer }) {
    const { answer } = containersApi.subscribeLogs(container.Name)
  
    return (
      <>
        <Grid numColsMd={1} numColsLg={1} className="gap-6 mt-6  h-fit ">
          <Card className="text-white h-96 overflow-y-auto font-mono card-color-1">
            {answer.length > 0 && answer.reverse().map(x => new TextDecoder('utf-8').decode(x)).map((x) => <p><b>&gt;&gt;&gt;</b> {x}</p>)}
          </Card>
        </Grid>
  
      </>
    )
  }
  