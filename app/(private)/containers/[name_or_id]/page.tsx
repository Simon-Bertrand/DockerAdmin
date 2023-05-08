

import { Title, Text } from '@tremor/react';
import ContainersDetails from 'app/containersdetails';
import { getContainer } from 'docker/api/containers';
import { IContainer } from 'docker/models';
export const dynamic = 'force-dynamic';


export default async function IndexPage({
  params
}: {
  params: object;
}) {

 
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      
      <h1>Container's detail: {params.name_or_id}</h1>
      <h5>The complete detail of the selected container</h5>

      <ContainersDetails name_or_id={params.name_or_id} ></ContainersDetails>
    </main>
  );
}
