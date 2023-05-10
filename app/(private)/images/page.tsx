import { Card, Title, Text } from '@tremor/react';
import Search from '../../search';
import UsersTable from '../../../src/widgets/table';

export const dynamic = 'force-dynamic';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? '';
  throw Error("Under development")
  // return (
  //   <main className="p-4 md:p-10 mx-auto max-w-7xl">
  //     <h1>Images</h1>
      
  //   </main>
  //);
}
