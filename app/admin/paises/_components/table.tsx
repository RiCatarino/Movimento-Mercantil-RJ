'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Loader from '@/components/loader';
import useSWR from 'swr';
import fetcher from '@/lib/fetch';
import BotaoNovoPais from './buttonnew';
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

export function TabelaPaises() {
  const {
    data: paises,
    isLoading,
    mutate,
  } = useSWR<Pais[]>('/api/pais/read', fetcher);

  async function handleDeletePais(id: number) {
    await fetch(`/api/pais/delete`, {
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
      <BotaoNovoPais mutate={mutate} />

      <Table>
        <TableHeader className='p-2 text-xs border-t-0 bg-gradient-to-r from-blue-200 to-blue-400 '>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Gentílico</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paises?.map((pais) => (
            <TableRow
              className='cursor-pointer hover:bg-blue-100'
              key={pais.id}
            >
              <TableCell className='font-medium w-10'>{pais.id}</TableCell>
              <TableCell className='font-medium'>{pais.pais}</TableCell>
              <TableCell className='font-medium'>{pais.gentilico}</TableCell>
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
                        onClick={() => handleDeletePais(pais.id)}
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

      {/* <VesselDetails
        open={open}
        setOpen={setOpen}
        embarcacao_id={embarcacao_id}
      /> */}
    </>
  );
}
