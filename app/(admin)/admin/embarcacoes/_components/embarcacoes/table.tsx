'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import VesselDetails from './vesseldetails';
import { useState } from 'react';
import Loader from '@/components/loader';
import useSWR from 'swr';
import fetcher from '@/lib/fetch';
import NewVessel from './buttonnew';
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

import { Input } from '@/components/ui/input';
import Paginacao from '@/components/sharedpagination';
import chunk from '@/lib/chunk';
import DialogEditarEmbarcacao from './dialogedit';

export default function TableEmbarcacoes() {
  const [filter, setFilter] = useState(null);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [embarcacao, setEmbarcacao] = useState<Embarcacao>();
  const [deleting, setDeleting] = useState(false);
  const [activePage, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');

  const {
    data: embarcacoesdata,
    isLoading,
    mutate,
  } = useSWR<Embarcacao[]>(
    searchText
      ? '/api/embarcacao/read/byname?nome=' + searchText
      : '/api/embarcacao/read',
    fetcher
  );

  const chunked = chunk(embarcacoesdata ?? [], 10);
  const embarcacoes = chunked[activePage - 1];

  async function handleDeleteEmbarcacao(id: number) {
    setDeleting(true);
    await fetch(`/api/embarcacao/delete`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
    mutate();
    toast({
      className: 'bg-green-200',
      title: 'Sucesso',
      duration: 5000,
      description: 'Embarcação removida com sucesso',
    });
    setDeleting(false);
  }

  // if (isLoading)
  //   return (
  //     <main className='flex flex-row justify-center p-4'>
  //       <Loader classProp='w-24 h-24 self-center flex' />
  //     </main>
  //   );

  // const handleSearch = (selectedEmbarcacao: any) => {
  //   setFilter(selectedEmbarcacao.nome);
  // };

  return (
    <div className='flex flex-col  gap-2 mt-2 p-2 border-2 border-gray-300 border-solid shadow-lg rounded-3xl'>
      <div className='flex flex-row justify-between gap-4 '>
        <Input
          className='rounded-xl'
          placeholder='Pesquisar...'
          onChange={(e) => setSearchText(e.target.value)}
        />
        <NewVessel mutate={mutate} />
      </div>

      <Table>
        <TableHeader className='p-2 text-xs border-t-0 bg-gradient-to-r from-blue-200 to-blue-400 '>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Tipo de Embarcação</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {embarcacoes
            ?.filter(
              (embarcacao) => !filter || embarcacao.nome.includes(filter)
            )
            .map((embarcacao) => (
              <TableRow
                className='cursor-pointer hover:bg-blue-100'
                key={embarcacao.id}
                onClick={(e) => {
                  setEmbarcacao(embarcacao);
                  setOpen(true);
                }}
              >
                <TableCell className='font-medium'>{embarcacao.id}</TableCell>
                <TableCell className='font-medium'>{embarcacao.nome}</TableCell>
                <TableCell className='font-medium'>
                  {embarcacao.tipo_embarcacao?.tipo}
                </TableCell>
                <TableCell className='w-4'>
                  <div className='flex gap-2'>
                    <Button
                      className='bg-transparent text-blue-500 hover:bg-blue-500 hover:text-white rounded-xl'
                      onClick={(e) => {
                        e.stopPropagation();
                        setEmbarcacao(embarcacao);
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
                            remover a unidade de medida.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            disabled={deleting}
                            className='bg-red-500 hover:bg-red-600'
                            onClick={(e) => {
                              handleDeleteEmbarcacao(embarcacao.id);
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
      <Paginacao chunked={chunked} activePage={activePage} setPage={setPage} />
      <VesselDetails
        open={open}
        setOpen={setOpen}
        embarcacao_id={embarcacao?.id}
      />
      <DialogEditarEmbarcacao
        open={openEdit}
        setOpen={setOpenEdit}
        mutate={mutate}
        embarcacao={embarcacao}
      />
    </div>
  );
}
