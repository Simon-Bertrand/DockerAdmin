
import '@src/home/styles/globals.css';
import { robotoLight } from '@src/home/fonts/register';
import AppWrapper from '@src/home/widgets/AppWrapper';


export const metadata = {
  title: 'DockerAdmin',
  description:
    'DockerAdmin\'s panel'
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full w-full ${robotoLight.className}`}>
      <AppWrapper>
        {children}
      </AppWrapper>
    </html>
  );
}
