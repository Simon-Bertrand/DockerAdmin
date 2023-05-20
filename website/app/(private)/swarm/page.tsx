import SwarmHomeComponent from "components/swarm/views/SwarmHome";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Swarm - DockerAdmin',
};

export default async function SwarmPage() {

  return <SwarmHomeComponent></SwarmHomeComponent>
}
