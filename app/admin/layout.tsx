import { Icon123, IconDashboard, IconLogout, IconRipple, IconSailboat, IconUsers, IconUsersGroup } from "@tabler/icons-react";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <button
        data-drawer-target='default-sidebar'
        data-drawer-toggle='default-sidebar'
        aria-controls='default-sidebar'
        type='button'
        className='inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
      >
        <span className='sr-only'>Open sidebar</span>
        <svg
          className='w-6 h-6'
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

      <aside
        id='default-sidebar'
        className='fixed top-2 left-2 z-40 w-64 h-[98%] transition-transform -translate-x-full sm:translate-x-0'
        aria-label='Sidebar'
      >

        <div className='h-full px-3 py-4 overflow-y-auto rounded-3xl shadow-lg bg-blue-200 dark:bg-gray-800'>
          <ul className='space-y-3 font-medium'>

          <div className='text-center font-bold text-l mb-5 mt-2'
            >Movimento Mercantil RJ</div>
          <hr className='mx-3 my-10 h-0.5 border-t-1 rounded-lg bg-white' />

            <li>
              <a
                href='#'
                className='flex items-center p-2 text-gray-900 rounded-2xl dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
              >
                <IconDashboard />
                <span className='ms-3'>Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href='#'
                className='flex items-center p-2 text-gray-900 rounded-2xl dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
              >
                <IconSailboat />
                <span className='flex-1 ms-3 whitespace-nowrap'>Embarcações</span>
                
              </a>
            </li>
            <li>
              <a
                href='#'
                className='flex items-center p-2 text-gray-900 rounded-2xl dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
              >
                <IconRipple />
                <span className='flex-1 ms-3 whitespace-nowrap'>Viagens</span>
              </a>
            </li>

            <li>
              <a
                href='#'
                className='flex items-center p-2 text-gray-900 rounded-2xl dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
              >
                <IconUsersGroup />
                <span className='flex-1 ms-3 whitespace-nowrap'>Pessoas</span>
                
                
              </a>
            </li>

            <hr className='mx-5 my-10 h-0.5 border-t-1 rounded-lg bg-white' />

          <ul className='space-y-3 font-medium bottom-5 absolute w-full right-0 left-0 px-3'>
            <li>
              <a
                href='#'
                className='flex items-center p-2 text-gray-900 rounded-2xl dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
              >
                <IconUsers />
                <span className='flex-1 ms-3 whitespace-nowrap'>Usuários</span>
              </a>
            </li>

            <li>
              
              <a
                href='#'
                className='flex items-center p-2 text-gray-900 rounded-2xl dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
              >  
                <IconLogout />
                <span className='flex-1 ms-3 whitespace-nowrap'>Sair</span>
              </a>
            </li>
          </ul>


          </ul>
        </div>
      </aside>

      {/* This is to  set all the styles in the admin page to be this one */}

      <div className='p-4 sm:ml-64'>{children}</div> 
    </>
  );
}
