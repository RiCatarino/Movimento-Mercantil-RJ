import { Inter as FontSans } from 'next/font/google';
import '../globals.css';
import { cn } from '@/lib/utils';
// import { usePathname } from 'next/navigation';
import { HomeIcon } from 'lucide-react';
const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const pathname = usePathname();
  return (
    <div
      className={cn(
        'min-h-screen bg-background font-sans antialiased max-h-screen',
        fontSans.variable
      )}
      id='magicpattern'
    >
      <nav className='absolute z-10 w-full'>
        <div className='flex items-center justify-between p-4 mt-5 bg-white shadow-xl rounded-3xl md:mx-24'>
          <h1 className='ml-6 text-xl font-bold'>MM RJ</h1>
          <ul className='flex items-center mr-6 space-x-4'>
            <li className='p-1 text-blue-500 rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white'>
              <a href='/' className=''>
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
      <main className='bg-transparent '>{children}</main>
    </div>
  );
}
