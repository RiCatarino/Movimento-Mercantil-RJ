'use client';
import fetcher from '@/lib/fetch';
import useSWR from 'swr';
import NewVessel from './_components/buttonnew';
import { DataTable } from './_components/table';

export default function EmbarcacoesPage() {
  const {
    data: embarcacoes,
    isLoading,
    mutate,
  } = useSWR<Embarcacao[]>('/api/embarcacao/read', fetcher);

  return (
    <main className='flex p-4 border-gray-300 border-solid border-2 rounded-3xl mx-2 lg:mx-10 md:mx-24 mt-5 shadow-lg '>
      <div className='flex flex-col w-full'>
        <NewVessel mutate={mutate} />
        <DataTable
          embarcacoes={embarcacoes}
          isLoading={isLoading}
          mutate={mutate}
        />
      </div>
    </main>
  );
}
