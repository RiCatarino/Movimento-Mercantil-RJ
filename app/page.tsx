'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const rows = [
    {
      id: 1,
      embarcacao: 'Embarcação 1',
      data: '2021-01-01',
      porto_origem: 'Porto 1',
      porto_destino: 'Porto 2',
    },
    {
      id: 2,
      embarcacao: 'Embarcação 2',
      data: '2021-01-02',
      porto_origem: 'Porto 2',
      porto_destino: 'Porto 3',
    },
    {
      id: 3,
      embarcacao: 'Embarcação 3',
      data: '2021-01-03',
      porto_origem: 'Porto 3',
      porto_destino: 'Porto 4',
    },
    {
      id: 4,
      embarcacao: 'Embarcação 4',
      data: '2021-01-04',
      porto_origem: 'Porto 4',
      porto_destino: 'Porto 5',
    },
    {
      id: 5,
      embarcacao: 'Embarcação 5',
      data: '2021-01-05',
      porto_origem: 'Porto 5',
      porto_destino: 'Porto 6',
    },
    {
      id: 6,
      embarcacao: 'Embarcação 6',
      data: '2021-01-06',
      porto_origem: 'Porto 6',
      porto_destino: 'Porto 7',
    },
  ];

  return (
    <main className='flex p-4 border-gray-300 border-solid border-2 rounded-3xl mx-10 md:mx-24 mt-5 shadow-lg '>
      <table className='table-auto w-full text-left rounded-xl p-10 border border-separate border-spacing-y-2 '>
        <thead className='bg-blue-200 rounded-xl p-1 uppercase text-xs'>
          <tr>
            <th className='p-2 rounded-l-lg'>Embarcação</th>
            <th>Data</th>
            <th>Porto de Origem</th>
            <th className='p-2 rounded-r-lg'>Porto de Destino</th>
          </tr>
        </thead>
        <tbody className=''>
          {rows.map((row, index) => (
            <tr
              key={index}
              className='text-xs  hover:bg-blue-200 hover:bg-opacity-30 cursor-pointer'
              onClick={() => router.push(`/embarcacao/${row.id}`)}
            >
              <td className='p-2 rounded-l-lg '>{row.embarcacao}</td>
              <td>{row.data}</td>
              <td>{row.porto_origem}</td>
              <td className='p-2 rounded-r-lg'>{row.porto_destino}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
