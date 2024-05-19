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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EditIcon } from 'lucide-react';
import DialogEditPessoa from './dialogedit';

export default function TabelaPessoas() {
  const [activePage, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string>('');
  const [openEdit, setOpenEdit] = useState(false);
  const [pessoa, setPessoa] = useState<Pessoa>();
  const {
    data: pessoasdata,
    isLoading,
    mutate,
  } = useSWR<Pessoa[]>(
    name ? '/api/pessoa/read/byname?nome=' + name : '/api/pessoa/read',
    fetcher
  );

  const chunked = chunk(pessoasdata ?? [], 10);
  const pessoas = chunked[activePage - 1];

  return (
    <div className='flex flex-col  gap-2 mt-2 p-2 border-2 border-gray-300 border-solid shadow-lg rounded-3xl'>
      <div className='flex justify-between gap-4'>
        <Input
          name='search'
          placeholder='Pesquisar por nome'
          onChange={(e) => setName(e.target.value)}
          value={name}
          className='rounded-xl'
        />
        <NewPerson mutate={mutate} />
      </div>
      {isLoading ? (
        <main className='flex flex-row justify-center p-4'>
          <Loader classProp='w-24 h-24 self-center flex' />
        </main>
      ) : (
        <div>
          <Table>
            <TableHeader className='p-2 border-t-0 bg-gradient-to-r from-blue-200 to-blue-400 '>
              <TableRow className='rounded-ss-xl'>
                <TableHead className='w-4'>ID</TableHead>
                <TableHead className='w-96'>Nome</TableHead>
                <TableHead>Título de Nobreza</TableHead>
                <TableHead>País</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pessoas?.map((pessoa) => (
                <TableRow
                  className='cursor-pointer hover:bg-blue-100'
                  key={pessoa.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setPessoa(pessoa);
                    setOpen(true);
                  }}
                >
                  <TableCell className='font-medium'>{pessoa.id}</TableCell>
                  <TableCell className='font-medium'>{pessoa.nome}</TableCell>
                  <TableCell className='font-medium'>
                    {pessoa?.titulo_nobreza?.titulo}
                  </TableCell>
                  <TableCell className='font-medium'>
                    {pessoa.pais?.pais}
                  </TableCell>
                  <TableCell className='w-4'>
                    <Button
                      className='bg-transparent text-blue-500 hover:bg-blue-500 hover:text-white rounded-xl'
                      onClick={(e) => {
                        e.stopPropagation();
                        setPessoa(pessoa);
                        setOpenEdit(true);
                      }}
                    >
                      <EditIcon size={24} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Paginacao
            chunked={chunked}
            activePage={activePage}
            setPage={setPage}
          />
          <PersonDetails
            open={open}
            setOpen={setOpen}
            pessoa_id={pessoa?.id}
            mutate={mutate}
          />
        </div>
      )}
      <DialogEditPessoa
        open={openEdit}
        setOpen={setOpenEdit}
        pessoa={pessoa}
        mutate={mutate}
      />
    </div>
  );
}
