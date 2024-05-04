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
import NewVessel from './buttonnew';
import TipoDetails from './details';

export function TableTipos() {
  const [open, setOpen] = useState(false);
  const [idTipo, setIdTipo] = useState<number | undefined>();

  const {
    data: tipos,
    isLoading,
    mutate,
  } = useSWR<TipoEmbarcacao[]>('/api/tipo_embarcacao/read', fetcher);

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
            <TableHead>Tipo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tipos?.map((tipo) => (
            <TableRow
              className='cursor-pointer hover:bg-blue-100'
              key={tipo.id}
              onClick={(e) => {
                e.stopPropagation();
                setIdTipo(tipo.id);
                setOpen(true);
              }}
            >
              <TableCell className='font-medium w-10'>{tipo.id}</TableCell>
              <TableCell className='font-medium'>{tipo.tipo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TipoDetails open={open} setOpen={setOpen} tipo_id={idTipo} />
    </div>
  );
}
