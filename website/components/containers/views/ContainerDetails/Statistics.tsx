import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

import { Grid, Card, Flex, Divider, DonutChart, Callout } from "@tremor/react";
import { containersApi } from "components/containers/api/get";
import IContainer from "components/containers/models/IContainer";
import { SpinnerComponent } from "components/home/widgets/Spinner";
import { convertFileSize, round } from "utils/maths";

export function StatisticsComponent({ container }: { container: IContainer }) {
  const { answer: unParsedStats } = containersApi.subscribeStats(container.Name) 
  const encoder = new TextDecoder("utf-8")
  const valueFormatter = (number: number) => `${Intl.NumberFormat("us").format(number).toString()} %`;


  let cpu_usage = null
  let cpu_use = null
  let cpu_total_use = null

  if (Object.keys(unParsedStats).length !== 0) {
    const stats = unParsedStats.map(x => JSON.parse(encoder.decode(x))).slice(-1)[0];
    cpu_use = stats.cpu_stats.cpu_usage.total_usage - stats.precpu_stats.cpu_usage.total_usage
    cpu_total_use = stats.cpu_stats.system_cpu_usage - stats.precpu_stats.system_cpu_usage
    cpu_usage = round(100 * cpu_use / cpu_total_use * stats.cpu_stats.online_cpus, 4)
    if (cpu_usage > 1) { cpu_usage = 100 }
    return (
      <>
        <Grid numColsMd={1} numColsLg={1} className="gap-6 mt-6">
          {(container.State.Status === "running" && <Card className="max-w-2xl mx-auto w-full card-color-1">

            <Flex>
              <h3>Statistics</h3>
              <h5>{container.Name} (#{container.Id.slice(0, 16)}...)</h5>
              <h5>Image : {container.Config.Image}</h5>
            </Flex>
            <Divider />

            <Flex className="justify-around">
              <h5 className="uppercase">CPU Usage</h5>
            </Flex>
            <Flex className="justify-around">
              <h5>({(cpu_usage ?? 0)} %)</h5>
            </Flex>

            <Flex>
              <DonutChart
                className="mt-4"
                data={[{ name: "CPU Used", value: cpu_usage ?? 0, }, { name: "Free CPU", value: (100 - (cpu_usage ?? 0)), }]}
                category="value"
                index="name"
                variant="pie"
                valueFormatter={valueFormatter}
                colors={["blue", "gray"]}
              />
            </Flex>
            <Flex className="justify-around">
              <h5>{(convertFileSize(cpu_use ?? 0))} / {convertFileSize((cpu_total_use ?? 0))}</h5>
            </Flex>
          </Card>) || <SpinnerComponent />}

          {container.State.Status !== "running" && <Callout
            className="h-12 mt-4"
            title="Nothing to show"
            icon={ExclamationCircleIcon}
            color="rose"
          >
            The container is not running
          </Callout>}
        </Grid>
      </>
    )
  } else { return (<SpinnerComponent />) }
}
