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
import { useState } from 'react';
import PersonDetails from './persondetails';
import fetcher from '@/lib/fetch';
import Loader from '@/components/loader';
import useSWR from 'swr';
import NewPerson from './buttonnew';
import Paginacao from '@/components/sharedpagination';
import chunk from '@/lib/chunk';

export function PeopleTable() {
  const [activePage, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [pessoa_id, setPessoaId] = useState<number | undefined>();

  const {
    data: pessoasdata,
    isLoading,
    mutate,
  } = useSWR<Pessoa[]>('/api/pessoa/read', fetcher, {});

  const chunked = chunk(pessoasdata ?? [], 10);
  const pessoas = chunked[activePage - 1];

  if (isLoading)
    return (
      <main className='flex flex-row justify-center p-4'>
        <Loader classProp='w-24 h-24 self-center flex' />
      </main>
    );

  return (
    <div className='flex flex-col  gap-2 mt-2 p-2 border-2 border-gray-300 border-solid shadow-lg rounded-3xl'>
      <NewPerson mutate={mutate} />
      <Table>
        <TableHeader className='p-2 text-xs border-t-0 bg-gradient-to-r from-blue-200 to-blue-400 '>
          <TableRow className='rounded-ss-xl'>
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Título Nobreza</TableHead>
            <TableHead>País</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pessoas?.map((pessoa) => (
            <TableRow
              className='cursor-pointer hover:bg-blue-100'
              key={pessoa.id}
              onClick={(e) => {
                e.stopPropagation();
                setPessoaId(pessoa.id);
                setOpen(true);
              }}
            >
              <TableCell className='text-xs font-medium'>{pessoa.id}</TableCell>
              <TableCell className='text-xs font-medium'>
                {pessoa.nome}
              </TableCell>
              <TableCell className='text-xs font-medium'>
                {pessoa?.titulo_nobreza?.titulo}
              </TableCell>
              <TableCell className='text-xs font-medium'>
                {pessoa.pais?.pais}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Paginacao chunked={chunked} activePage={activePage} setPage={setPage} />
      <PersonDetails
        open={open}
        setOpen={setOpen}
        pessoa_id={pessoa_id}
        // mutate={mutate}
      />
    </div>
  );
}
