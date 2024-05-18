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
import CargoDetails from './cargodetails';
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

export default function TabelaCargos() {
  const [activePage, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [cargo, setCargo] = useState<Cargo>();
  const [deleting, setDeleting] = useState(false);
  const [name, setName] = useState<string | undefined>();

  const {
    data: cargosdata,
    isLoading,
    mutate,
  } = useSWR<Cargo[]>('/api/cargo/read', fetcher);

  const chunked = chunk(cargosdata ?? [], 10);
  const cargos = chunked[activePage - 1];

  async function handleDeleteCargo(id: number) {
    setDeleting(true);
    await fetch(`/api/cargo/delete`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
    mutate();
    toast({
      className: 'bg-green-200',
      title: 'Sucesso',
      duration: 5000,
      description: 'Cargo removido com sucesso',
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
      <div className='flex justify-between gap-4'>
        <Input
          placeholder='Pesquisar por nome'
          onChange={(e) => setName(e.target.value)}
          value={name}
          className='rounded-xl'
        />
        <NovoTitulo mutate={mutate} />
      </div>
      <Table>
        <TableHeader className='p-2 text-xs border-t-0 bg-gradient-to-r from-blue-200 to-blue-400 '>
          <TableRow className='rounded-ss-xl'>
            <TableHead>ID</TableHead>
            <TableHead>Cargo</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cargos?.map((cargo) => (
            <TableRow
              className='cursor-pointer hover:bg-blue-100'
              key={cargo.id}
              onClick={(e) => {
                e.stopPropagation();
                setCargo(cargo);
                setOpen(true);
              }}
            >
              <TableCell className='text-xs font-medium w-10'>
                {cargo.id}
              </TableCell>
              <TableCell className='text-xs font-medium'>
                {cargo.cargo}
              </TableCell>
              <TableCell className='w-4'>
                <div className='flex gap-2'>
                  <Button
                    className='bg-transparent text-blue-500 hover:bg-blue-500 hover:text-white rounded-xl'
                    onClick={(e) => {
                      e.stopPropagation();
                      setCargo(cargo);
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
                          Esta ação não pode ser desfeita. Esta ação irá remover
                          o cargo.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          disabled={deleting}
                          className='bg-red-500 hover:bg-red-600'
                          onClick={(e) => {
                            handleDeleteCargo(cargo.id);
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
      <CargoDetails open={open} setOpen={setOpen} cargo_id={cargo?.id} />
      <DialogEditarCargo
        open={openEdit}
        setOpen={setOpenEdit}
        cargo={cargo}
        mutate={mutate}
      />
    </div>
  );
}
