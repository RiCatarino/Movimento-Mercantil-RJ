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

export function TabelaPortos() {
  const [open, setOpen] = useState(false);
  const [porto_id, setPortoId] = useState<number | undefined>();

  const {
    data: portos,
    isLoading,
    mutate,
  } = useSWR<Porto[]>('/api/porto/read', fetcher);

  if (isLoading)
    return (
      <main className='flex flex-row justify-center p-4'>
        <Loader classProp='w-24 h-24 self-center flex' />
      </main>
    );

  return (
    <>
      <BotaoNovaUnidade mutate={mutate} />
      <Table>
        <TableHeader className='p-2 text-xs border-t-0 bg-gradient-to-r from-blue-200 to-blue-400 '>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>País</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {portos?.map((porto) => (
            <TableRow
              className='cursor-pointer hover:bg-blue-100'
              key={porto.id}
              onClick={(e) => {
                e.stopPropagation();
                setPortoId(porto.id);
                setOpen(true);
              }}
            >
              <TableCell className='font-medium w-10'>{porto.id}</TableCell>
              <TableCell className='font-medium max-w-32'>
                {porto.nome}
              </TableCell>
              <TableCell className='font-medium'>{porto.pais?.pais}</TableCell>
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
