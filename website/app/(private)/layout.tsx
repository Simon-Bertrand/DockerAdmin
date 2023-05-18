

import { Suspense } from 'react';
import '@src/home/styles/globals.css';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { AppContextProvider } from '@src/home/context/app';
import MainComponent from '@src/home/view/Main';
import BottomBar from '@src/home/widgets/BottomBar';
import NavbarComponent from '@src/home/widgets/Navbar';

import { getServerSession } from 'next-auth';



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
