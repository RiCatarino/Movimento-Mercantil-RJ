import { Inter as FontSans } from 'next/font/google';
import '../globals.css';
import { cn } from '@/lib/utils';
// import { usePathname } from 'next/navigation';
import { CircleHelp, LogInIcon } from 'lucide-react';
import Loader from '@/components/loader';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Movimento Mercantil RJ',
  description: 'Página Principal do Movimento Mercantil RJ',
};

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const pathname = usePathname();
  return (
    <div
      className={cn(
        'min-h-screen bg-background dark:bg-slate-700 dark:bg-opacity-0 font-sans antialiased relative overflow-auto',
        fontSans.variable
      )}
      id='magicpattern'
    >
      <nav className='relative z-10 w-full'>
        <div className='flex items-center justify-between p-4 mx-8 mt-5 bg-white dark:bg-slate-900 shadow-xl rounded-3xl lg:mx-24'>
          <div className='flex items-center space-x-4'>
            <Loader classProp='w-8 h-8' />
            <Link href='/'>
              <h1 className='ml-6 text-xl font-bold cursor-pointer'>MM RJ</h1>
            </Link>
          </div>
          <div className='flex items-center space-x-4'>
            <Link href='/sobre'>
              <Button
                size='sm'
                className='bg-blue-400 rounded-xl hover:bg-blue-500'
              >
                <CircleHelp size={16} className='mr-2' /> Sobre
              </Button>
            </Link>
            <Link href='/auth/signin'>
              <Button
                size='sm'
                className='bg-blue-400 rounded-xl hover:bg-blue-500'
              >
                <LogInIcon size={16} className='mr-2' /> Entrar
              </Button>
            </Link>
          </div>
        </div>
      </nav>
      <main className='obg-transparent verflow-auto '>{children}</main>
    </div>
  );
}
