import { AppContextProvider } from '@/src/context/app';
import MainComponent from '@/src/views/main';
import Nav from 'app/nav';

import AnalyticsWrapper from 'app/analytics';
import { Suspense } from 'react';
import 'app/globals.css';
import { getServerSession } from 'next-auth'
import { authOptions } from 'pages/api/auth/[...nextauth]';


export const metadata = {
  title: 'DockerAdmin',
  description:
    'DockerAdmin\'s panel'
};

export default async function RootLayout({children }: { children: React.ReactNode}) {
  const session = await getServerSession(authOptions)
  return (
          <body className="h-full ">
            <AppContextProvider>
              <>
                <MainComponent>
                  <Suspense fallback="...">
                    {/* @ts-expect-error Server Component */}
                    <Nav session={session} />
                  </Suspense>
                    {children}
                  <AnalyticsWrapper />
                </MainComponent>
              </>
            </AppContextProvider>
          </body>
    
  );
}
