import { ContainersApi } from '@/src/fetchs/api/containers';
import { HTTPFetch } from '@/src/fetchs/response';
import { Title, Text } from '@tremor/react';
import ContainersTable from 'app/containerstable';






export default async function IndexPage() {
  const httpResponseData = await (HTTPFetch(ContainersApi.getContainers))
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
   
      <h1 className='pb-2'>Containers</h1>

      <ContainersTable httpResponseData={httpResponseData} />
   
    </main>
  );
}
