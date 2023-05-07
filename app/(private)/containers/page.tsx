
import { Title, Text } from '@tremor/react';
import ContainersTable from 'app/containerstable';
import { getContainers } from 'docker/api/containers';
import { IContainers } from 'docker/models';
import { HTTPFetch } from 'docker/response';






export default async function IndexPage() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
   
      <h1 className='pb-2'>Containers</h1>

      <ContainersTable httpResponseData={await (HTTPFetch<IContainers[]>(getContainers()))} />
   
    </main>
  );
}
