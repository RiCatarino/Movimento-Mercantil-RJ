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
import { Loader2 } from 'lucide-react';
import PersonDetails from './persondetails';
import fetcher from '@/lib/fetch';

import useSWR from 'swr';

export function PeopleTable() {
  const [open, setOpen] = useState(false);
  const [pessoa_id, setPessoaId] = useState<number | undefined>();
  const {
    data: pessoas,
    isLoading,
    mutate,
  } = useSWR<Pessoa[]>('/api/pessoa/read', fetcher);

  return (
    <div className='rounded-md'>
      {isLoading ? (
        <div className='flex justify-center items-center h-24'>
          <Loader2 className=' h-24 w-24 animate-spin text-blue-200' />
        </div>
      ) : (
        <Table>
          <TableHeader className='bg-blue-200 p-2 text-xs border-t-0 '>
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
                <TableCell className='font-medium text-xs'>
                  {pessoa.id}
                </TableCell>
                <TableCell className='font-medium text-xs'>
                  {pessoa.nome}
                </TableCell>
                <TableCell className='font-medium text-xs'>
                  {pessoa?.titulo_nobreza?.titulo}
                </TableCell>
                <TableCell className='font-medium text-xs'>
                  {pessoa.pais?.pais}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <PersonDetails
        open={open}
        setOpen={setOpen}
        pessoa_id={pessoa_id}
        mutate={mutate}
      />
    </div>
  );
}
