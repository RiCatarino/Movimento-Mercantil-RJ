import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
// import { usePathname } from 'next/navigation';
import { HomeIcon } from 'lucide-react';
const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const pathname = usePathname();
  return (
    <html lang='en' suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased max-h-screen',
          fontSans.variable
        )}
      >
        <main className='bg-transparent '>{children}</main>
      </body>
    </html>
  );
}
