import { Card, Title, Text } from '@tremor/react';
import Search from 'app/search';
import UsersTable from '@/src/widgets/table';

export const dynamic = 'force-dynamic';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? '';
  throw Error("Under development")
}
