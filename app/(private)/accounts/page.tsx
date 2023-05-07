
import { Card, TextInput } from '@tremor/react';
import ContainersTable from 'app/containerstable';
import GenericTable from '@/src/widgets/table';
import UsersTable from '@/src/widgets/table';
import { prisma } from 'db/client';
import {AccountList} from '@/src/widgets/modals/ListModals';



export default async function IndexPage() {
  
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
   
      <h1 className='pb-2'>Administration's accounts</h1>

      <Card className='card-color-1'>
        <AccountList/>
      </Card>
   
    </main>
  );
}
