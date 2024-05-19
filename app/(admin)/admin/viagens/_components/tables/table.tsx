'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import dayjs from 'dayjs';
// import utc from 'dayjs/plugin/utc';
import fetcher from '@/lib/fetch';
import useSWR from 'swr';
import TripDetails from '../tripdetails';
import { useState } from 'react';
import Loader from '@/components/loader';
import Paginacao from '@/components/sharedpagination';
import chunk from '@/lib/chunk';
import BotaoNovaViagem from '../buttons/botaonovaviagem';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTriggerFilter,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { EditIcon } from 'lucide-react';
import DialogEditarViagem from '../dialogedit';

// dayjs.extend(utc);

export default function TripsTable() {
  const [activePage, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [viagem, setViagem] = useState<Viagem>();
  const [searchText, setSearchText] = useState('');
  const [selectedYear, setSelectedYear] = useState('none');
  const [selectedType, setSelectedType] = useState('none');

  const {
    data: viagensdata,
    isLoading,
    mutate,
  } = useSWR<Viagem[]>(
    searchText || selectedYear !== 'none' || selectedType !== 'none'
      ? `/api/viagem/read/bysearch?search=${searchText}&ano=${selectedYear}&tipo=${selectedType}`
      : '/api/viagem/read/',
    fetcher
  );

  const chunked = chunk(viagensdata ?? [], 10);
  const viagens = chunked[activePage - 1];

  return (
    <>
      <div className='flex flex-col-reverse justify-between lg:flex-row md:flex-nowrap gap-4'>
        <Input
          name='search'
          className='rounded-xl '
          placeholder='Pesquisar...'
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className='flex flex-col md:flex-row gap-4 '>
          <Select name='ano' onValueChange={(e) => setSelectedYear(e)}>
            <SelectTriggerFilter className='rounded-xl w-full md:w-1/2 lg:w-[180px]'>
              <SelectValue placeholder='Ano' />
            </SelectTriggerFilter>
            <SelectContent>
              <SelectItem key='empty' value='none'>
                {'Sem filtro'}
              </SelectItem>

              {Array.from({ length: 23 }, (_, i) => 1808 + i).map((year) => (
                <SelectItem key={year} value={String(year)}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select name='tipo' onValueChange={(e) => setSelectedType(e)}>
            <SelectTriggerFilter className='rounded-xl w-full md:w-1/2 lg:w-[180px]'>
              <SelectValue placeholder='Tipo' />
            </SelectTriggerFilter>

            <SelectContent>
              <SelectItem key='empty' value='none'>
                {'Sem filtro'}
              </SelectItem>
              <SelectItem value='Sahida'>Sahida</SelectItem>
              <SelectItem value='Entrada'>Entrada</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <BotaoNovaViagem />
      </div>
      {isLoading ? (
        <div className='flex flex-row justify-center p-4'>
          <Loader classProp='w-24 h-24 self-center flex' />
        </div>
      ) : (
        <Table>
          <TableHeader className='p-2 border-t-0 bg-gradient-to-r from-blue-200 to-blue-400 '>
            <TableRow className='rounded-ss-xl'>
              <TableHead className='w-4'>ID</TableHead>
              <TableHead className='w-96'>Data Rio</TableHead>
              <TableHead className='w-96'>Tipo</TableHead>
              <TableHead>Embarcação</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {viagens?.map((viagem) => (
              <TableRow
                className='cursor-pointer hover:bg-blue-100'
                key={viagem.id}
                onClick={(e) => {
                  setViagem(viagem);
                  setOpen(true);
                }}
              >
                <TableCell className='font-medium'>{viagem.id}</TableCell>
                <TableCell className='font-medium'>
                  {viagem.data_rio
                    ? dayjs(viagem.data_rio).format('DD/MM/YYYY')
                    : 'N/A'}
                </TableCell>
                <TableCell className='font-medium'>
                  {viagem.entrada_sahida}
                </TableCell>
                <TableCell className='font-medium'>
                  {viagem.embarcacao.nome}
                </TableCell>
                <TableCell className='w-4'>
                  <Button
                    className='text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white rounded-xl'
                    onClick={(e) => {
                      e.stopPropagation();
                      setViagem(viagem);
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
      )}
      <Paginacao chunked={chunked} activePage={activePage} setPage={setPage} />
      <TripDetails
        open={open}
        setOpen={setOpen}
        viagem_id={viagem?.id}
        mutate={mutate}
      />
      <DialogEditarViagem
        open={openEdit}
        setOpen={setOpenEdit}
        viagem_id={viagem?.id}
        mutate={mutate}
      />
    </>
  );
}
