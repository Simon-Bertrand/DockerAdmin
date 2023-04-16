import { Title, Text } from '@tremor/react';
import ContainersTable from '../containerstable';
import { ContainersApi } from '../../src/fetchs/api/containers';
import {HTTPFetch}  from '../../src/fetchs/response';





export default async function IndexPage() {
  const httpResponseData = await (HTTPFetch(ContainersApi.getContainers))
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Containers</Title>
      <Text className='mb-8'>
        A list of containers
      </Text>

      <ContainersTable httpResponseData={httpResponseData} />
    </main>
  );
}
