'use client';

import { useEffect, useRef, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Toaster } from '@/components/ui/sonner';
import {
  GitCompareArrows,
  LayoutDashboard,
  PersonStanding,
  Ship,
  UserCheck,
  Users,
} from 'lucide-react';

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const [sidebar, setSideBar] = useState(false);

  const sideNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add event listener to the document object
    document.addEventListener('mousedown', handleClickOutside);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function handleClickOutside(event: Event) {
    if (
      sideNavRef.current &&
      !sideNavRef.current.contains(event.target as Node)
    ) {
      setSideBar(false);
    }
  }

  return (
    <>
      <nav
        ref={sideNavRef}
        className='border-b-2 flex flex-row justify-between w-full items-center h-20 px-5 shadow'
      >
        <button
          data-drawer-target='default-sidebar'
          data-drawer-toggle='default-sidebar'
          aria-controls='default-sidebar'
          type='button'
          onClick={() => setSideBar(!sidebar)}
          className='inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
        >
          <span className='sr-only'>Open sidebar</span>
          <svg
            className='w-6 h-6 text-blue-400'
            aria-hidden='true'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              clipRule='evenodd'
              fillRule='evenodd'
              d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'
            ></path>
          </svg>
        </button>
        <h1 className='text-xl font-bold text-center'>
          Movimento Mercantil RJ
        </h1>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost'>
              <div className='flex flex-row items-center justify-center text-blue-400'>
                <UserCheck />
                <span className='ms-3'>Gervasio</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>other</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {sidebar && (
          <aside
            id='default-sidebar'
            className='absolute top-2 left-2 z-40 w-60 mt-20 '
            aria-label='Sidebar'
          >
            <div className='h-full px-3 py-4 overflow-y-auto rounded-xl shadow-2xl bg-blue-200 dark:bg-gray-800'>
              <ul className='space-y-3 font-medium'>
                <li>
                  <Link
                    onClick={() => {
                      setSideBar(false);
                    }}
                    href='/admin/dashboard'
                    className='flex items-center p-2 text-gray-900 rounded-2xl dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
                  >
                    <LayoutDashboard />
                    <span className='ms-3'>Dashboard</span>
                  </Link>
                </li>

                <li>
                  <Link
                    onClick={() => {
                      setSideBar(false);
                    }}
                    href='/admin/embarcacoes'
                    className='flex items-center p-2 text-gray-900 rounded-2xl dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
                  >
                    <Ship />
                    <span className='flex-1 ms-3 whitespace-nowrap'>
                      Embarcações
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    onClick={() => {
                      setSideBar(false);
                    }}
                    href='/admin/viagens'
                    className='flex items-center p-2 text-gray-900 rounded-2xl dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
                  >
                    <GitCompareArrows />
                    <span className='flex-1 ms-3 whitespace-nowrap'>
                      Viagens
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    onClick={() => {
                      setSideBar(false);
                    }}
                    href='/admin/pessoas'
                    className='flex items-center p-2 text-gray-900 rounded-2xl dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
                  >
                    <PersonStanding />
                    <span className='flex-1 ms-3 whitespace-nowrap'>
                      Pessoas
                    </span>
                  </Link>
                </li>

                <hr className='mx-5 my-10 h-0.5 border-t-1 rounded-lg bg-white' />

                <li>
                  <Link
                    onClick={() => {
                      setSideBar(false);
                    }}
                    href='/admin/usuarios'
                    className='flex items-center p-2 text-gray-900 rounded-2xl dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
                  >
                    <Users />
                    <span className='flex-1 ms-3 whitespace-nowrap'>
                      Usuários
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        )}

        {/* This is to  set all the styles in the admin page to be this one */}
      </nav>
      <div className='p-4 lg:p-8'>
        <>
          {children} <Toaster />{' '}
        </>
      </div>
    </>
  );
}
