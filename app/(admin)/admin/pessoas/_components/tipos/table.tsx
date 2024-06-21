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
import NovoTipo from './buttonnew';
import { useState } from 'react';
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
import { EditIcon, XIcon } from 'lucide-react';
import Paginacao from '@/components/sharedpagination';
import chunk from '@/lib/chunk';
import { Input } from '@/components/ui/input';
import DialogEditarCargo from './dialogedit';
import BotaoExportarParaExcel from './buttonexport';
import DialogEditarTipoDePassageiro from './dialogedit';

export default function TabelaTiposdePassageiros() {
  const [activePage, setPage] = useState(1);
  const [openEdit, setOpenEdit] = useState(false);
  const [tipo, setTipo] = useState<TipoPassageiro>();
  const [deleting, setDeleting] = useState(false);
  const [name, setName] = useState<string | undefined>();
  const [searchText, setSearchText] = useState('');

  const {
    data: tiposdata,
    isLoading,
    mutate,
  } = useSWR<TipoPassageiro[]>(
    searchText
      ? '/api/tiposdepassageiros/read/byname?tipo=' + searchText
      : '/api/tiposdepassageiros/read',
    fetcher
  );

  const chunked = chunk(tiposdata ?? [], 10);
  const tipos = chunked[activePage - 1];

  async function handleDeleteTipo(id: number) {
    setDeleting(true);
    await fetch(`/api/tiposdepassageiros/delete`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
    mutate();
    toast({
      className: 'bg-green-200',
      title: 'Sucesso',
      duration: 5000,
      description: 'Tipo de passageiro removido com sucesso',
    });
    setDeleting(false);
  }

  return (
    <div className='flex flex-col p-2 mt-2 border-2 border-gray-300 dark:border-slate-900 border-solid shadow-lg  gap-2 rounded-3xl'>
      <div className='flex flex-col-reverse justify-between md:flex-row gap-4 '>
        <Input
          name='search'
          placeholder='Pesquisar por nome do tipo...'
          onChange={(e) => setSearchText(e.target.value)}
          value={name}
          className='rounded-xl'
        />
        <NovoTipo mutate={mutate} />
        {/* <BotaoExportarParaExcel tipos={tipos} /> */}
      </div>
      {isLoading ? (
        <div className='flex flex-row justify-center p-4'>
          <Loader classProp='w-24 h-24 self-center flex' />
        </div>
      ) : (
        <Table>
          <TableHeader className='p-2 border-t-0 bg-gradient-to-r from-blue-200 to-blue-400 dark:from-slate-700 dark:to-slate-950'>
            <TableRow className='rounded-ss-xl'>
              {/* <TableHead>ID</TableHead> */}
              <TableHead>Tipo</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tipos?.map((tipo) => (
              <TableRow
                className=' hover:bg-blue-100'
                key={tipo.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setTipo(tipo);
                }}
              >
                {/* <TableCell className='w-10 font-medium'>{cargo.id}</TableCell> */}
                <TableCell className='font-medium'>{tipo.tipo}</TableCell>
                <TableCell className='w-4'>
                  <div className='flex gap-2'>
                    <Button
                      className='text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white rounded-xl'
                      onClick={(e) => {
                        e.stopPropagation();
                        setTipo(tipo);
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
                            Esta ação não pode ser desfeita. Esta ação irá
                            remover o tipo de passageiro.
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
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <Paginacao chunked={chunked} activePage={activePage} setPage={setPage} />
      <DialogEditarTipoDePassageiro
        open={openEdit}
        setOpen={setOpenEdit}
        tipo={tipo}
        mutate={mutate}
      />
    </div>
  );
}
