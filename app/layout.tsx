'use client';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import styles from './background.module.css';
import { IconHome, IconHomeFilled } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
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
  if (pathname === '/admin') {
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
          <div
            style={{
              zIndex: -1,
              position: 'absolute',
              width: '100%',
            }}
          >
            <svg
              version='1.1'
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
              x='0px'
              y='0px'
              width='100%'
              height='100vh'
              viewBox='0 0 1600 900'
              preserveAspectRatio='xMidYMax slice'
            >
              <defs>
                <linearGradient id='bg'>
                  <stop
                    offset='0%'
                    style={{
                      stopColor: 'rgba(130, 158, 249, 0.06)',
                    }}
                  ></stop>
                  <stop
                    offset='50%'
                    style={{ stopColor: 'rgba(76, 190, 255, 0.6)' }}
                  ></stop>

                  <stop
                    offset='100%'
                    style={{ stopColor: 'rgba(10, 10, 72, 0.2)' }}
                  ></stop>
                </linearGradient>
                <path
                  id='wave'
                  fill='url(#bg)'
                  d='M-363.852,502.589c0,0,236.988-41.997,505.475,0
	s371.981,38.998,575.971,0s293.985-39.278,505.474,5.859s493.475,48.368,716.963-4.995v560.106H-363.852V502.589z'
                />
              </defs>
              <g>
                <use xlinkHref='#wave' opacity='.3'>
                  <animateTransform
                    attributeName='transform'
                    attributeType='XML'
                    type='translate'
                    dur='10s'
                    calcMode='spline'
                    values='270 230; -334 180; 270 230'
                    keyTimes='0; .5; 1'
                    keySplines='0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0'
                    repeatCount='indefinite'
                  />
                </use>
                <use xlinkHref='#wave' opacity='.6'>
                  <animateTransform
                    attributeName='transform'
                    attributeType='XML'
                    type='translate'
                    dur='8s'
                    calcMode='spline'
                    values='-270 230;243 220;-270 230'
                    keyTimes='0; .6; 1'
                    keySplines='0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0'
                    repeatCount='indefinite'
                  />
                </use>
                <use xlinkHref='#wave' opacity='.9'>
                  <animateTransform
                    attributeName='transform'
                    attributeType='XML'
                    type='translate'
                    dur='6s'
                    calcMode='spline'
                    values='0 230;-140 200;0 230'
                    keyTimes='0; .4; 1'
                    keySplines='0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0'
                    repeatCount='indefinite'
                  />
                </use>
              </g>
            </svg>
          </div>

          <nav>
            <div className='flex justify-between items-center p-4 border-gray-300 border-solid border-2 rounded-3xl mx-10 md:mx-24 mt-5 shadow-lg'>
              <h1 className='text-xl font-bold'>Movimento Mercantil RJ</h1>
              <ul className='flex space-x-4'>
                <li className='hover:bg-blue-500 rounded-lg p-1 text-blue-500 hover:text-white cursor-pointer'>
                  <a href='#' className=''>
                    <IconHomeFilled />
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
          {children}
        </body>
      </html>
    );
  }
}
