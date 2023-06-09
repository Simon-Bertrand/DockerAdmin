import LogInComponent from "@src/home/widgets/LogIn";

export const dynamic = 'force-dynamic'
export default async function LogInPage() {
    return (
      <main className="flex p-4 md:p-10 mx-auto max-w-7xl text-black dark:text-white h-full items-center">
        <LogInComponent />
      </main>
    );
  }