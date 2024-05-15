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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import Paginacao from '@/components/sharedpagination';
import chunk from '@/lib/chunk';

export default function TableUnidadesDeMedida() {
  const [activePage, setPage] = useState(1);
  const {
    data: unidadesdata,
    isLoading,
    mutate,
  } = useSWR<UnidadeDeMedida[]>('/api/unidade_de_medida/read', fetcher);

  const chunked = chunk(unidadesdata ?? [], 10);
  const unidades = chunked[activePage - 1];

  async function handleDeleteUnidade(id: number) {
    await fetch(`/api/unidade_de_medida/delete`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
    mutate();
    toast({
      className: 'bg-green-200',
      title: 'Sucesso',
      duration: 5000,
      description: 'Unidade removida com sucesso',
    });
  }

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
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {unidades?.map((unidade) => (
            <TableRow
              className='cursor-pointer hover:bg-blue-100'
              key={unidade.id}
            >
              <TableCell className='font-medium w-10'>{unidade.id}</TableCell>
              <TableCell className='font-medium'>
                {unidade.unidade_medida}
              </TableCell>
              <TableCell className='w-4'>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size='icon'
                      variant='link'
                      className='text-xs text-blue-500'
                    >
                      <XIcon className='w-4 text-red-700' />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className='text-red-500'>
                        Tem a certeza?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Esta ação irá remover a
                        unidade de medida.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        disabled={isLoading}
                        className='bg-red-500 hover:bg-red-600'
                        onClick={() => handleDeleteUnidade(unidade.id)}
                      >
                        {isLoading ? 'Aguarde...' : 'Remover'}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Paginacao chunked={chunked} activePage={activePage} setPage={setPage} />

      {/* <VesselDetails
        open={open}
        setOpen={setOpen}
        embarcacao_id={embarcacao_id}
      /> */}
    </>
  );
}
