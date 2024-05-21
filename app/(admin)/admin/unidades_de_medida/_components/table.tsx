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
import { EditIcon, XIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import Paginacao from '@/components/sharedpagination';
import chunk from '@/lib/chunk';
import { Input } from '@/components/ui/input';
import DialogEditarUnidadeMedida from './editdialog';

export default function TableUnidadesDeMedida() {
  const [activePage, setPage] = useState(1);
  const [openEdit, setOpenEdit] = useState(false);
  const [unidade, setUnidade] = useState<UnidadeDeMedida>();
  const [searchText, setSearchText] = useState('');

  const {
    data: unidadesdata,
    isLoading,
    mutate,
  } = useSWR<UnidadeDeMedida[]>(
    searchText
      ? '/api/unidade_de_medida/read/byname?unidade_medida=' + searchText
      : '/api/unidade_de_medida/read',
    fetcher
  );

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
  return (
    // <div className='flex flex-col p-2 mt-2 border-2 border-gray-300 border-solid shadow-lg  gap-2 rounded-3xl'>
    <>
      <div className='flex flex-col-reverse justify-between md:flex-row gap-4 '>
        <Input
          name='search'
          className='rounded-xl'
          placeholder='Pesquisar por nome...'
          onChange={(e) => setSearchText(e.target.value)}
        />
        <BotaoNovaUnidade mutate={mutate} />
      </div>
      {isLoading ? (
        <div className='flex flex-row justify-center p-4'>
          <Loader classProp='w-24 h-24 self-center flex' />
        </div>
      ) : (
        <Table>
          <TableHeader className='p-2 border-t-0 bg-gradient-to-r from-blue-200 to-blue-400 '>
            <TableRow>
              {/* <TableHead>ID</TableHead> */}
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
                {/* <TableCell className='w-10 font-medium'>{unidade.id}</TableCell> */}
                <TableCell className='font-medium'>
                  {unidade.unidade_medida}
                </TableCell>
                <TableCell className='w-4'>
                  <div className='flex gap-2'>
                    <Button
                      className='text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white rounded-xl'
                      onClick={(e) => {
                        e.stopPropagation();
                        setUnidade(unidade);
                        setOpenEdit(true);
                      }}
                    >
                      <EditIcon size={24} />
                    </Button>
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
                            Esta ação não pode ser desfeita. Esta ação irá
                            remover a unidade de medida.
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
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <Paginacao chunked={chunked} activePage={activePage} setPage={setPage} />

      <DialogEditarUnidadeMedida
        open={openEdit}
        setOpen={setOpenEdit}
        unidade={unidade}
        mutate={mutate}
      />
    </>
  );
}
