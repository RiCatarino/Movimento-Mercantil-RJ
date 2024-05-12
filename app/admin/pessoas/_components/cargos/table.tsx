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
// import NewPerson from './buttonnew';

export function TabelaCargos() {
  const [open, setOpen] = useState(false);
  const [cargo_id, setCargoId] = useState<number | undefined>();
  const {
    data: cargos,
    isLoading,
    mutate,
  } = useSWR<Cargo[]>('/api/cargo/read', fetcher);

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
            <TableHead>Cargo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cargos?.map((cargo) => (
            <TableRow
              className='cursor-pointer hover:bg-blue-100'
              key={cargo.id}
              onClick={(e) => {
                e.stopPropagation();
                setCargoId(cargo.id);
                setOpen(true);
              }}
            >
              <TableCell className='text-xs font-medium w-10'>
                {cargo.id}
              </TableCell>
              <TableCell className='text-xs font-medium'>
                {cargo.cargo}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CargoDetails open={open} setOpen={setOpen} cargo_id={cargo_id} />
    </div>
  );
}
