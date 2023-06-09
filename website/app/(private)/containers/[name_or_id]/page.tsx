import ContainerDetailsComponent from "components/containers/views/ContainerDetails/ContainerDetails";


export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Container - DockerAdmin',
};

export default async function IndexPage({
  params
}: {
  params: {name_or_id : string};
}) {

 
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      
      <h1>Container's detail: {params.name_or_id}</h1>
      <h5>The complete detail of the selected container</h5>

      <ContainerDetailsComponent name_or_id={params.name_or_id} ></ContainerDetailsComponent>
    </main>
  );
}
