import Navbar from '../src/widgets/navbar';

export async function Nav({session}:{session:any}) {

  return <Navbar user={session?.user} />;
}

export default Nav