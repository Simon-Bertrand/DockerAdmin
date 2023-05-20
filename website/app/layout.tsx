
import { robotoLight } from '@src/fonts/register';
import AppWrapper from 'components/home/widgets/AppWrapper';
import '@src/styles/globals.css';

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
