import ContainersTableComponent from "components/containers/views/ContainersTable";



export const metadata = {
  title: 'Containers - DockerAdmin',
};

export default async function IndexPage() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
   
      <h1 className='pb-2'>Containers</h1>
      <ContainersTableComponent />
    </main>
  );
}
