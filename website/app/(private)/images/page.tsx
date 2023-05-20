import ImagesHomeComponent from "components/images/views/ImagesHome";

export const dynamic = 'force-dynamic';

export default async function ImagesPage() {

  return <main className="p-4 md:p-10 mx-auto max-w-7xl">
  <h1>Images</h1>
    <ImagesHomeComponent></ImagesHomeComponent>
  </main>
 
}
