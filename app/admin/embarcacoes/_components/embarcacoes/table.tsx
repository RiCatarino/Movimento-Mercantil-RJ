'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import VesselDetails from './vesseldetails';
import { useState } from 'react';
import Loader from '@/components/loader';
import useSWR from 'swr';
import fetcher from '@/lib/fetch';
import NewVessel from './buttonnew';

export function TableEmbarcacoes() {
  const [open, setOpen] = useState(false);
  const [embarcacao_id, setEmbarcacaoId] = useState<number | undefined>();

  const {
    data: embarcacoes,
    isLoading,
    mutate,
  } = useSWR<Embarcacao[]>('/api/embarcacao/read', fetcher);

  if (isLoading)
    return (
      <main className='flex flex-row justify-center p-4'>
        <Loader classProp='w-24 h-24 self-center flex' />
      </main>
    );

  return (
    <div className='flex flex-col  gap-2 mt-2 p-2 border-2 border-gray-300 border-solid shadow-lg rounded-3xl'>
      <NewVessel mutate={mutate} />

      <Table>
        <TableHeader className='p-2 text-xs border-t-0 bg-gradient-to-r from-blue-200 to-blue-400 '>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Tipo de Embarcação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {embarcacoes?.map((embarcacao) => (
            <TableRow
              className='cursor-pointer hover:bg-blue-100'
              key={embarcacao.id}
              onClick={(e) => {
                e.stopPropagation();
                setEmbarcacaoId(embarcacao.id);
                setOpen(true);
              }}
            >
              <TableCell className='font-medium'>{embarcacao.id}</TableCell>
              <TableCell className='font-medium'>{embarcacao.nome}</TableCell>
              <TableCell className='font-medium'>
                {embarcacao.tipo_embarcacao.tipo}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <VesselDetails
        open={open}
        setOpen={setOpen}
        embarcacao_id={embarcacao_id}
      />
    </div>
  );
}
