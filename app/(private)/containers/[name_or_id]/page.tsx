

import { HTTPFetch } from '@/src/fetchs/response';
import { ContainersApi } from '@/src/fetchs/api/containers';
import { Title, Text } from '@tremor/react';
import ContainersDetails from 'app/containersdetails';
export const dynamic = 'force-dynamic';


export default async function IndexPage({
  params
}: {
  params: object;
}) {



  const httpResponseData = await (HTTPFetch(ContainersApi.getContainer(params.name_or_id)))

 
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      
      <h1>Container's detail: {params.name_or_id}</h1>
      <h5>The complete detail of the selected container</h5>

      <ContainersDetails httpResponseData={httpResponseData}></ContainersDetails>
    </main>
  );
}
