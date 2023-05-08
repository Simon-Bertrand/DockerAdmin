import { AppContextProvider } from '@/src/context/app';
import MainComponent from '@/src/views/main';
import Nav from 'app/nav';

import AnalyticsWrapper from 'app/analytics';
import { Suspense } from 'react';
import 'app/globals.css';
import AppWrapper from '@/src/wrapper';
import { robotoLight } from '@/src/fonts/register';

export const metadata = {
  title: 'DockerAdmin',
  description:
    'DockerAdmin\'s panel'
};

export default async function RootLayout({children }: { children: React.ReactNode}) {



  return (
        <html lang="en" className={`h-full w-full ${robotoLight.className}`}>
          <AppWrapper>
          {children}
          </AppWrapper>
        </html>
  );
}
