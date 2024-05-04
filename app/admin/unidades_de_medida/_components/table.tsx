'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState } from 'react';
import Loader from '@/components/loader';
import useSWR from 'swr';
import fetcher from '@/lib/fetch';
import BotaoNovaUnidade from './buttonnew';

export function TableUnidadesDeMedida() {
  const [open, setOpen] = useState(false);
  const [embarcacao_id, setEmbarcacaoId] = useState<number | undefined>();

  const {
    data: unidades,
    isLoading,
    mutate,
  } = useSWR<UnidadeDeMedida[]>('/api/unidade_de_medida/read', fetcher);

  if (isLoading)
    return (
      <main className='flex flex-row justify-center p-4'>
        <Loader classProp='w-24 h-24 self-center flex' />
      </main>
    );

  return (
    // <div className='flex flex-col  gap-2 mt-2 p-2 border-2 border-gray-300 border-solid shadow-lg rounded-3xl'>
    <>
      {/* <NewVessel mutate={mutate} /> */}
      <BotaoNovaUnidade mutate={mutate} />

      <Table>
        <TableHeader className='p-2 text-xs border-t-0 bg-gradient-to-r from-blue-200 to-blue-400 '>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Unidade de Medida</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {unidades?.map((unidade) => (
            <TableRow
              className='cursor-pointer hover:bg-blue-100'
              key={unidade.id}
              onClick={(e) => {
                e.stopPropagation();
                setEmbarcacaoId(unidade.id);
                setOpen(true);
              }}
            >
              <TableCell className='font-medium w-10'>{unidade.id}</TableCell>
              <TableCell className='font-medium'>
                {unidade.unidade_medida}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* <VesselDetails
        open={open}
        setOpen={setOpen}
        embarcacao_id={embarcacao_id}
      /> */}
    </>
  );
}
