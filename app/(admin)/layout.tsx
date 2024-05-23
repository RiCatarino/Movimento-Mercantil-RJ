import NavBar from './_components/navbar';
import { SessionProvider } from '../SessionContext';
import { validateRequest } from '@/auth';

export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();
  var pjson = require('@/package.json');

  return (
    <SessionProvider value={session}>
      <NavBar />
      <main className='p-4 lg:p-8'>
        <>{children}</>
      </main>
      <footer className='p-4 lg:p-8 text-center text-gray-500 relative bottom-0  w-full'>
        Versão {pjson.version}
      </footer>
    </SessionProvider>
  );
}
