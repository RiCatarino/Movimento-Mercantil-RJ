import { redirect } from 'next/navigation';
import { validateRequest } from '@/auth';
import PessoasTabs from './_components/tabs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin | Pessoas',
  description: 'Gestão de Pessoas',
};

export default async function PessoasPage() {
  const { user } = await validateRequest();

  if (!user) {
    return redirect('/auth/signin');
  }
  return (
    <main className='p-1 md:p-4 lg:mx-24 '>
      <PessoasTabs />
    </main>
  );
}
