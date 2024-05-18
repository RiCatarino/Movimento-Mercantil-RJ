'use client';

import {
  AnchorIcon,
  FlagIcon,
  GitCompareArrows,
  LayoutDashboard,
  PersonStanding,
  ScaleIcon,
  Ship,
  UserCheck,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
import { useSession } from '@/app/SessionContext';

export default function NavBar() {
  const [sidebar, setSideBar] = useState(false);
  const sideNavRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [pageName, setPageName] = useState('');
  const router = useRouter();
  const { user } = useSession();

  useEffect(() => {
    switch (pathname) {
      case '/admin/dashboard':
        setPageName('Dashboard');
        break;
      case '/admin/embarcacoes':
        setPageName('Embarcações');
        break;
      case '/admin/viagens':
        setPageName('Viagens');
        break;
      case '/admin/pessoas':
        setPageName('Pessoas');
        break;
      case '/admin/portos':
        setPageName('Portos');
        break;
      case '/admin/paises':
        setPageName('Países');
        break;
      case '/admin/unidades_de_medida':
        setPageName('Unidades de Medida');
        break;
      case '/admin/usuarios':
        setPageName('Usuários');
        break;
      default:
        setPageName('Dashboard');
    }
  }, [pathname]);

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
    <nav
      ref={sideNavRef}
      className='flex flex-row items-center justify-between w-full h-20 px-5 border-b-2 shadow'
    >
      <button
        data-drawer-target='default-sidebar'
        data-drawer-toggle='default-sidebar'
        // aria-controls='default-sidebar'
        aria-label='Open sidebar'
        type='button'
        onClick={() => setSideBar(!sidebar)}
        className=' inline-flex items-center p-2 mt-2 text-sm text-gray-500 rounded-lg ms-3 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
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
      <h1 className='text-xl font-bold text-center'>{pageName}</h1>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost'>
            <div className='flex flex-row items-center justify-center text-blue-400'>
              <UserCheck />
              <span className='ms-3'>{user?.nome}</span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>A minha Conta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push('/admin/meuperfil')}>
            Perfil
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className='text-red-400 focus:text-red-600'
            onClick={() => {
              fetch('/api/user/signout', {
                method: 'GET',
              }).then(() => {
                router.push('/');
              });
            }}
          >
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {sidebar && (
        <aside
          id='default-sidebar'
          className='absolute z-40 mt-20 top-2 left-2 w-60 '
          aria-label='Sidebar'
        >
          <div className='h-full px-3 py-4 overflow-y-auto bg-white border shadow-2xl rounded-xl dark:bg-gray-800'>
            <ul className='font-medium space-y-3'>
              <li>
                <Link
                  onClick={() => {
                    setSideBar(false);
                  }}
                  href='/admin/dashboard'
                  className='flex items-center p-2 text-gray-900 rounded-2xl dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700 group'
                >
                  <LayoutDashboard className='text-blue-500' />
                  <span className='ms-3'>Dashboard</span>
                </Link>
              </li>

              <li>
                <Link
                  onClick={() => {
                    setSideBar(false);
                  }}
                  href='/admin/embarcacoes'
                  className='flex items-center p-2 text-gray-900 rounded-2xl dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700 group'
                >
                  <Ship className='text-blue-500' />
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
                  className='flex items-center p-2 text-gray-900 rounded-2xl dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700 group'
                >
                  <GitCompareArrows className='text-blue-500' />
                  <span className='flex-1 ms-3 whitespace-nowrap'>Viagens</span>
                </Link>
              </li>

              <li>
                <Link
                  onClick={() => {
                    setSideBar(false);
                  }}
                  href='/admin/pessoas'
                  className='flex items-center p-2 text-gray-900 rounded-2xl dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700 group'
                >
                  <PersonStanding className='text-blue-500' />
                  <span className='flex-1 ms-3 whitespace-nowrap'>Pessoas</span>
                </Link>
              </li>

              <li>
                <Link
                  onClick={() => {
                    setSideBar(false);
                  }}
                  href='/admin/portos'
                  className='flex items-center p-2 text-gray-900 rounded-2xl dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700 group'
                >
                  <AnchorIcon className='text-blue-500' />
                  <span className='flex-1 ms-3 whitespace-nowrap'>Portos</span>
                </Link>
              </li>

              <li>
                <Link
                  onClick={() => {
                    setSideBar(false);
                  }}
                  href='/admin/paises'
                  className='flex items-center p-2 text-gray-900 rounded-2xl dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700 group'
                >
                  <FlagIcon className='text-blue-500' />
                  <span className='flex-1 ms-3 whitespace-nowrap'>Países</span>
                </Link>
              </li>

              <li>
                <Link
                  onClick={() => {
                    setSideBar(false);
                  }}
                  href='/admin/unidades_de_medida'
                  className='flex items-center p-2 text-gray-900 rounded-2xl dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700 group'
                >
                  <ScaleIcon className='text-blue-500' />
                  <span className='flex-1 ms-3 whitespace-nowrap'>
                    Unidades de Medida
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
                  className='flex items-center p-2 text-gray-900 rounded-2xl dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700 group'
                >
                  <Users className='text-blue-500' />
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
  );
}
