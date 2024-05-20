import NavBar from './_components/navbar';
import { SessionProvider } from '../SessionContext';
import { validateRequest } from '@/auth';

export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();

  return (
    <SessionProvider value={session}>
      <NavBar />
      <div className='p-4 lg:p-8'>
        <>{children}</>
      </div>
    </SessionProvider>
  );
}
