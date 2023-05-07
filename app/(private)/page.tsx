import { getContainers } from "docker/api/containers";

export default async function HomePage() {

  let res = (await getContainers())
  console.log(res)
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      
      <h1>Welcome to DockerAdmin</h1>

      <p>

        {JSON.stringify(res)}
      </p>
    </main>
  );
}
