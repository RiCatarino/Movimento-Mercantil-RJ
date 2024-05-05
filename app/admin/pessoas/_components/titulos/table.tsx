'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
// import VesselDetails from './vesseldetails';
import fetcher from '@/lib/fetch';
import Loader from '@/components/loader';
import useSWR from 'swr';
import NovoTitulo from './buttonnew';
import { useState } from 'react';
import TituloDetails from './titulodetails';
// import NewPerson from './buttonnew';

export function TabelaTitulos() {
  const [open, setOpen] = useState(false);
  const [titulo_id, setTituloId] = useState<number | undefined>();
  const {
    data: titulos,
    isLoading,
    mutate,
  } = useSWR<TituloNobreza[]>('/api/titulo_nobreza/read', fetcher);

  if (isLoading)
    return (
      <main className='flex flex-row justify-center p-4'>
        <Loader classProp='w-24 h-24 self-center flex' />
      </main>
    );

  return (
    <div className='flex flex-col  gap-2 mt-2 p-2 border-2 border-gray-300 border-solid shadow-lg rounded-3xl'>
      <NovoTitulo mutate={mutate} />
      <Table>
        <TableHeader className='p-2 text-xs border-t-0 bg-gradient-to-r from-blue-200 to-blue-400 '>
          <TableRow className='rounded-ss-xl'>
            <TableHead>ID</TableHead>
            <TableHead>Título Nobreza</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {titulos?.map((titulo) => (
            <TableRow
              className='cursor-pointer hover:bg-blue-100'
              key={titulo.id}
              onClick={(e) => {
                e.stopPropagation();
                setTituloId(titulo.id);
                setOpen(true);
              }}
            >
              <TableCell className='text-xs font-medium w-10'>
                {titulo.id}
              </TableCell>
              <TableCell className='text-xs font-medium'>
                {titulo.titulo}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TituloDetails open={open} setOpen={setOpen} titulo_id={titulo_id} />
    </div>
  );
}
