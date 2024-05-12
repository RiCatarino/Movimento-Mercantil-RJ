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
import PortoDetails from './details';
import { Button } from '@/components/ui/button';
import { EditIcon } from 'lucide-react';
import DialogEditarPorto from './dialogedit';

export function TabelaPortos() {
  const [open, setOpen] = useState(false);
  const [porto_id, setPortoId] = useState<number | undefined>();
  const [openEdit, setOpenEdit] = useState(false);

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
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {portos?.map((porto) => (
            <TableRow
              className='cursor-pointer hover:bg-blue-100'
              key={porto.id}
              onClick={(e) => {
                setPortoId(porto.id);
                setOpen(true);
              }}
            >
              <TableCell className='font-medium w-10'>{porto.id}</TableCell>
              <TableCell className='font-medium max-w-32'>
                {porto.nome}
              </TableCell>
              <TableCell className='font-medium'>{porto.pais?.pais}</TableCell>
              <TableCell className='w-4'>
                <Button
                  className='bg-transparent text-blue-500 hover:bg-blue-500 hover:text-white rounded-xl'
                  onClick={(e) => {
                    e.stopPropagation();
                    setPortoId(porto.id);
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

      <PortoDetails
        open={open}
        setOpen={setOpen}
        porto_id={porto_id}
        mutate={mutate}
      />
      <DialogEditarPorto
        open={openEdit}
        setOpen={setOpenEdit}
        porto_id={porto_id}
        mutate={mutate}
        nome={portos?.find((porto) => porto.id === porto_id)?.nome}
        pais={portos?.find((porto) => porto.id === porto_id)?.pais?.id}
      />
    </>
  );
}
