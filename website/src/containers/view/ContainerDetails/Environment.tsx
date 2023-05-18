import { Grid, Card, Flex, Divider, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell } from "@tremor/react"
import { shortenString } from "utils/string"

export function EnvironmentComponent({ container }: { container: any }) {
    return (
      <>
        <Grid numColsMd={1} numColsLg={1} className="gap-6 mt-6">
          <Card className="max-w-2xl mx-auto w-full card-color-1">
            <Flex>
              <h3>Environment variables</h3>
              <h5>{container.Name} (#{shortenString(container.Id, 30)})</h5>
              <h5>{container.Config.Image}</h5>
            </Flex>
            <Divider />
            <Table className="mt-5">
              <TableHead>
                <TableRow>
                  <TableHeaderCell className="text-center uppercase">Name</TableHeaderCell>
                  <TableHeaderCell className="text-center uppercase">Value</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {container.Config.Env.map((x) => x.split("=")).map((x) => {
                  return <TableRow key={"item.name"}>
                    <TableCell className="text-center" title={x[0]}>{x[0]}</TableCell>
                    <TableCell className="text-center" title={x[1]}>{shortenString(x[1], 45)}</TableCell>
                  </TableRow>
  
                })}
              </TableBody>
            </Table>
          </Card>
        </Grid>
  
      </>
    )
  }