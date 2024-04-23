'use client';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import styles from './background.module.css';
import { usePathname } from 'next/navigation';
import { HomeIcon } from 'lucide-react';
const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) {
    return (
      <html lang='en' suppressHydrationWarning>
        <head />
        <body
          className={cn(
            'min-h-screen bg-background font-sans antialiased',
            fontSans.variable
          )}
        >
          {children}
        </body>
      </html>
    );
  } else {
    return (
      <html lang='en' suppressHydrationWarning>
        <head />
        <body
          className={cn(
            'h-screen bg-background font-sans antialiased',
            fontSans.variable
          )}
          id='magicpattern'
        >
          <nav className='absolute w-full'>
            <div className='flex bg-white justify-between items-center p-4 rounded-3xl mx-10 md:mx-24 mt-5 shadow-xl'>
              <h1 className='text-xl font-bold'>Movimento Mercantil RJ</h1>
              <ul className='flex space-x-4 items-center'>
                <li className='hover:bg-blue-500 rounded-lg p-1 text-blue-500 hover:text-white cursor-pointer'>
                  <a href='#' className=''>
                    <HomeIcon />
                  </a>
                </li>
                <li>
                  <a href='#' className='text-blue-500'>
                    About
                  </a>
                </li>
                <li>
                  <a href='#' className='text-blue-500'>
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <main className='bg-transparent'>{children}</main>
        </body>
      </html>
    );
  }
}
