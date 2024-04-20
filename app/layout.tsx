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
  console.log(pathname);
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
            'min-h-screen bg-background font-sans antialiased',
            fontSans.variable
          )}
        >
          <nav>
            <div className='flex justify-between items-center p-4 border-gray-300 border-solid border-2 rounded-3xl mx-10 md:mx-24 mt-5 shadow-lg'>
              <h1 className='text-xl font-bold'>Movimento Mercantil RJ</h1>
              <ul className='flex space-x-4'>
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
