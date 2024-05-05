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
import TipoDetails from './details';
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
import { XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import NovoTipo from './buttonnew';

export function TableTipos() {
  const [open, setOpen] = useState(false);
  const [idTipo, setIdTipo] = useState<number | undefined>();
  const [deleting, setDeleting] = useState(false);

  const {
    data: tipos,
    isLoading,
    mutate,
  } = useSWR<TipoEmbarcacao[]>('/api/tipo_embarcacao/read', fetcher);

  async function handleDeleteTipo(id: number) {
    setDeleting(true);
    await fetch(`/api/tipo_embarcacao/delete`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
    mutate();
    toast({
      className: 'bg-green-200',
      title: 'Sucesso',
      duration: 5000,
      description: 'Tipo removido com sucesso',
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
      <NovoTipo mutate={mutate} />

      <Table>
        <TableHeader className='p-2 text-xs border-t-0 bg-gradient-to-r from-blue-200 to-blue-400 '>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tipos?.map((tipo) => (
            <TableRow
              className='cursor-pointer hover:bg-blue-100'
              key={tipo.id}
              onClick={(e) => {
                setIdTipo(tipo.id);
                setOpen(true);
              }}
            >
              <TableCell className='font-medium w-10'>{tipo.id}</TableCell>
              <TableCell className='font-medium'>{tipo.tipo}</TableCell>
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
                        Esta ação não pode ser desfeita. Esta ação irá remover a
                        unidade de medida.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        disabled={deleting}
                        className='bg-red-500 hover:bg-red-600'
                        onClick={(e) => {
                          handleDeleteTipo(tipo.id);
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

      <TipoDetails open={open} setOpen={setOpen} tipo_id={idTipo} />
    </div>
  );
}
