import ErrorComponent from '@src/home/view/Error';

export const dynamic = 'force-dynamic';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? '';

  return <ErrorComponent title="Under development" question='This part will arrive soon'></ErrorComponent>
}
