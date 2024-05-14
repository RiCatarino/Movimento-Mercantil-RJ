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
import { toast } from '@/components/ui/use-toast';
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
import Paginacao from '@/components/sharedpagination';
import chunk from '@/lib/chunk';

export function TabelaTitulos() {
  const [activePage, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [titulo_id, setTituloId] = useState<number | undefined>();
  const [deleting, setDeleting] = useState(false);

  const {
    data: titulosdata,
    isLoading,
    mutate,
  } = useSWR<TituloNobreza[]>('/api/titulo_nobreza/read', fetcher);

  const chunked = chunk(titulosdata ?? [], 10);
  const titulos = chunked[activePage - 1];

  async function handleDeleteTitulo(id: number) {
    setDeleting(true);
    await fetch(`/api/titulo_nobreza/delete`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
    mutate();
    toast({
      className: 'bg-green-200',
      title: 'Sucesso',
      duration: 5000,
      description: 'Título removido com sucesso',
    });
    setDeleting(false);
  }

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
            <TableHead></TableHead>
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
              <TableCell className='w-4'>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size='icon'
                      variant='link'
                      className='text-xs text-blue-500'
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <XIcon className='w-4 text-red-700' />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <AlertDialogHeader>
                      <AlertDialogTitle className='text-red-500'>
                        Tem a certeza?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Esta ação irá remover o
                        título de nobreza.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        disabled={deleting}
                        className='bg-red-500 hover:bg-red-600'
                        onClick={(e) => {
                          handleDeleteTitulo(titulo.id);
                        }}
                      >
                        {deleting && <Loader classProp='w-4 h-4' />} Remover
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
      <TituloDetails open={open} setOpen={setOpen} titulo_id={titulo_id} />
    </div>
  );
}
