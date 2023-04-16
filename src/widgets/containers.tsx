'use client';
import { useState } from "react";
// import { UserGroupIcon, UserIcon } from "@heroicons/react/solid";

import {
  TabList,
  Tab,
  Card,
  ProgressBar,
  Flex,
  Text,
  Metric,
  Title,
  Grid,
  Color,
} from "@tremor/react";

const categories: {
    title: string;
    metric: string;
    color: Color;
  }[] = [
    {
      title: "Sales",
      metric: "$ 23,456,456",
      color: "indigo",
    },
    {
      title: "Profit",
      metric: "$ 13,123",
      color: "fuchsia",
    },
    {
      title: "Customers",
      metric: "456",
      color: "amber",
    },
    {
        title: "Customers",
        metric: "456",
        color: "amber",
    },
    {
    title: "Customers",
    metric: "456",
    color: "amber",
    },
  ];
  


export const ContainerComponent : React.FunctionComponent<any> = (props : any) : JSX.Element  => {
    const [showCard, setShowCard] = useState(true);
    return (
      <Card>
        <>
          <Text>Main Title</Text>
          <Metric>Containers running</Metric>
          <TabList
            defaultValue="1"
            onValueChange={(value) => setShowCard(value === "1")}
            className="mt-6"
          >
            <Tab value="1" text="Entity 1" />
            <Tab value="2" text="Entity 2"  />
          </TabList>
        </>
  
        {showCard === true ? (
          <div className="mt-6">
                <Title >Entity name</Title>
                <Text className='mb-8'>
                    Containers belonging to entity
                </Text>
                <Grid numColsSm={2} numColsLg={3} className="gap-6">

                {categories.map((item) => (
                <Card key={item.title} decoration="top" decorationColor={item.color}>
                    <Flex justifyContent="start" className="space-x-4">
                        
                    <div className="truncate">
                        <Text>{item.title}</Text>
                        <Metric className="truncate">{item.metric}</Metric>
                    </div>
                    <div>
                    <Text >{item.title}</Text>
                    </div>
                    </Flex>

                </Card>
                ))}
   

                </Grid>
          </div>
        ) : (
          <div className="mt-6">
         
          </div>
        )}
      </Card>
    )
}


export default ContainerComponent