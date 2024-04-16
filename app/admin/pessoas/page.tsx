'use client';

import { PeopleTable } from '../pessoas/_components/table';
import NewPerson from './_components/buttonnew';

export default function PessoasPage() {
  return (
    <main className='flex p-4 border-gray-300 border-solid border-2 rounded-3xl mx-10 md:mx-24 mt-5 shadow-lg '>
      <div className='flex flex-col w-full'>
        <NewPerson />
        <PeopleTable />
      </div>
    </main>
  );
}
