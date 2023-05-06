
import { ContainersApi } from '@/src/fetchs/api/containers';
import { HTTPFetch } from '@/src/fetchs/response';
import { Card, TextInput } from '@tremor/react';
import ContainersTable from 'app/containerstable';
import GenericTable from '@/src/widgets/table';
import UsersTable from '@/src/widgets/table';
import { prisma } from 'db/client';
import { useState } from 'react';
import ListModals from '@/src/widgets/modals/ListModals';



function formatCell(x : any, k : string) {
  switch (k) {
    case 'createdAt':
    case "updatedAt": 
      return x.toLocaleString()
    case "login":
      return x
    default : return x.toString()
  }
}


export default async function IndexPage() {


  async function fetchUsers() {
    'use server';
    return await prisma.user.fetch({})
  }
  function createAccount(id : string) {

  }
  function deleteAccount(id : string) {

  }
  function updateAccount(id : string) {

  }
  const res = await fetchUsers()
  console.log(res)

 
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
   
      <h1 className='pb-2'>Administration's accounts</h1>

      <Card className='card-color-1'>
        <ListModals>
          <GenericTable
          data={res}
          idField = {"id"}
          rowExecute = {[
            {"update" : updateAccount},
            {"delete" : deleteAccount}
          ]}
          fields={["id", "login", "createdAt", "updatedAt"]}
          formatCell={formatCell}
          />
        </ListModals>
      </Card>
   
    </main>
  );
}
