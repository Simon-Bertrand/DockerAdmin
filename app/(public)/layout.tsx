import 'app/globals.css';


export const metadata = {
  title: 'Sign in - DockerAdmin',
  description:
    'DockerAdmin\'s panel'
};

export default async function LogInLayout({children }: { children: React.ReactNode}) {

  return (
          <body className={`h-full`}>
            {children}
          </body>
  );
}
