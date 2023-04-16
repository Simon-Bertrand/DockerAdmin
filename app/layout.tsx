import './globals.css';
import {MainComponent} from "../src/views/main"
import Nav from './nav';
import AnalyticsWrapper from './analytics';
import { Suspense, useEffect } from 'react';
import { AppContextProvider, useAppContext } from '../src/context/app';
import dynamic from 'next/dynamic'



export const metadata = {
  title: 'DockerAdmin',
  description:
    'DockerAdmin\'s panel'
};

export default async function RootLayout({children }: { children: React.ReactNode}) {

  return (
        <html lang="en" className="h-full bg-da-grey text-white">
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
        </html>
  );
}
