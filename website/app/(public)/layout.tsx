
import { AppContextProvider } from '@src/home/context/app';
import { MainComponent } from '@src/home/view/Main';
import '@src/home/styles/globals.css';

export const metadata = {
  title: 'Sign in - DockerAdmin',
  description:
    'DockerAdmin\'s sign in'
};

export default async function LogInLayout({children }: { children: React.ReactNode}) {
 
  return (
          <body className={`h-full bg-gradient-to-tr from-slate-300 to-gray-500`}>
            <AppContextProvider>
              <MainComponent>{children}</MainComponent>
            </AppContextProvider>
          </body>
  );
}
