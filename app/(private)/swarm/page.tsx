import { Card, Title, Text } from '@tremor/react';
import Search from 'app/search';
import UsersTable from 'app/table';

export const dynamic = 'force-dynamic';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? '';

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <h1>Swarm</h1>
    </main>
  );
}
