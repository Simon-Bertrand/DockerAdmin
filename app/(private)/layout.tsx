import { AppContextProvider } from '@/src/context/app';
import MainComponent from '@/src/views/main';
import Nav from 'app/nav';

import AnalyticsWrapper from 'app/analytics';
import { Suspense } from 'react';
import 'app/globals.css';




export const metadata = {
  title: 'DockerAdmin',
  description:
    'DockerAdmin\'s panel'
};

export default async function RootLayout({children }: { children: React.ReactNode}) {

  return (
          <body className="h-full">
            <AppContextProvider>
              <>
                <MainComponent>
                  <Suspense fallback="...">
                    {/* @ts-expect-error Server Component */}
                    <Nav />
                  </Suspense>
                    {children}
                  <AnalyticsWrapper />
                </MainComponent>
              </>
            </AppContextProvider>
          </body>
    
  );
}
