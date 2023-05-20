

import '@src/styles/globals.css';
import { Suspense } from 'react';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { AppContextProvider } from '@src/context/app';
import MainComponent from 'components/home/views/Main';
import BottomBar from 'components/home/widgets/BottomBar';
import NavbarComponent from 'components/home/widgets/Navbar';



export const metadata = {
  title: 'DockerAdmin',
  description:
    'DockerAdmin\'s panel'
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  return (
    <body className="h-full ">
      <AppContextProvider>
        <>
          <MainComponent>
            <Suspense fallback="...">
              {/* @ts-expect-error Server Component */}
              <NavbarComponent user={session?.user} />
            </Suspense>
            {children}
          </MainComponent>
          <BottomBar></BottomBar>
        </>
      </AppContextProvider>

    </body>

  );
}
