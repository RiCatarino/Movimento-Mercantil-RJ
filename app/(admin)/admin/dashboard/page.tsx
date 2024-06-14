import { validateRequest } from '@/auth';

import Stats from './_components/stats';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
// import { useRouter } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Admin | Dashboard',
  description: 'Dashboard de Administrador',
};

export default async function Dashboard() {
  const { user } = await validateRequest();

  if (!user) {
    return redirect('/auth/signin');
  }

  return <Stats />;
}
