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
    <main className='flex flex-col p-4 mx-10 mt-5 border-2 border-gray-300 border-solid shadow-lg gap-2 rounded-3xl md:mx-24 '>
      <NewVessel mutate={mutate} />
      <DataTable
        embarcacoes={embarcacoes}
        isLoading={isLoading}
        mutate={mutate}
      />
    </main>
  );
}
