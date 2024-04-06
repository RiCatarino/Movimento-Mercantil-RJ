'use client';
import fetcher from '@/lib/fetch';
import useSWR from 'swr';
import NewVessel from './_components/buttonnew';

export default function EmbarcacoesPage() {
  const { data, isLoading } = useSWR<Embarcacao[]>(
    '/api/embarcacao/read',
    fetcher
  );

  return (
    <main className='flex p-4 border-gray-300 border-solid border-2 rounded-3xl mx-10 md:mx-24 mt-5 shadow-lg '>
      <div className='flex flex-col w-full'>
        <NewVessel />
        <table className='table-auto w-full text-left rounded-xl p-10 border border-separate border-spacing-y-2 '>
          <thead className='bg-blue-200 rounded-xl p-1 uppercase text-xs'>
            <tr>
              <th className='p-2 rounded-l-lg'>ID</th>
              <th>Nome</th>
              <th>Observação</th>
              <th className='p-2 rounded-r-lg'>Tipo de Embarcação</th>
            </tr>
          </thead>
          <tbody className=''>
            {data?.map((embarcacao) => (
              <tr
                key={embarcacao.id}
                className='text-xs  hover:bg-blue-200 hover:bg-opacity-30 cursor-pointer'
              >
                <td className='p-2 rounded-l-lg '>{embarcacao?.id}</td>
                <td>{embarcacao?.nome}</td>
                <td>{embarcacao?.observacao}</td>
                <td className='p-2 rounded-r-lg'>
                  {embarcacao?.tipo_embarcacao.tipo}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
