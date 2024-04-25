'use client';

import { PeopleTable } from '../pessoas/_components/table';
import NewPerson from './_components/buttonnew';

export default function PessoasPage() {
  return (
    <main className='flex flex-col p-4 mx-10 mt-5 border-2 border-gray-300 border-solid shadow-lg gap-2 rounded-3xl md:mx-24 '>
      <NewPerson />
      <PeopleTable />
    </main>
  );
}
