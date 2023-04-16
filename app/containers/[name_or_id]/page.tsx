
import { Card, Title, Text, Grid, TabList, Tab, Flex, Bold } from '@tremor/react';
import Search from '../../search';
import ContainersTable from '../../containerstable';
import ContainersDetails from '../../containersdetails';
export const dynamic = 'force-dynamic';


export default async function IndexPage({
  params
}: {
  params: object;
}) {

  async function getData() {
    const res = await fetch(`http://localhost:3000/api/containers/${params.name_or_id}`,  { cache: 'no-store' });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
  
    // Recommendation: handle errors
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
    }
 
   
    return res.json();
  }

  const data = await getData();

 
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Container's detail: {params.name_or_id}</Title>
      <Text>The complete detail of the selected container</Text>

      <ContainersDetails container={data.payload[0]}></ContainersDetails>
    </main>
  );
}
