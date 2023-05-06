import { AppContextProvider } from '@/src/context/app';
import MainComponent from '@/src/views/main';
import 'app/globals.css';
import { useLocalStorage } from 'usehooks-ts';

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
