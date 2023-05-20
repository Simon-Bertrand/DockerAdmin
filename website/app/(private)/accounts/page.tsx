
import { Card } from '@tremor/react';
import AccountsListComponent from 'components/accounts/views/AccountsList';


export default async function IndexPage() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <h1 className='pb-2'>Administration's accounts</h1>
      <Card className='card-color-1'>
        <AccountsListComponent />
      </Card>
    </main>
  );
}
