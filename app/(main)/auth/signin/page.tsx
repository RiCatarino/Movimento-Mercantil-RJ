import { validateRequest } from '@/auth';
import SignInPage from './_components/signin';
import { redirect } from 'next/navigation';

export default async function Page() {
  const { user } = await validateRequest();

  if (user) {
    redirect('/admin/dashboard');
  }
  return <SignInPage />;
}
