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
import utc from 'dayjs/plugin/utc';
import tz from 'dayjs/plugin/timezone';
import { useState } from 'react';
import Paginacao from '@/components/sharedpagination';
import chunk from '@/lib/chunk';
import MercadoriaEscalasDrawer from '../mercadoriaescaladrawer';

dayjs.extend(utc);
dayjs.extend(tz);

export default function TableEscalas(props: { escalas: Escala[] | undefined }) {
  const [activePage, setPage] = useState(1);
  const { escalas } = props;
  const [open, setOpen] = useState(false);
  const [relacmercadoriaescala, setRelacMercadoriaEscala] = useState<
    RelacMercadoriaEscala[] | undefined
  >();
  const [escala_id, setEscalaId] = useState<number | undefined>();

  const chunked = chunk(escalas ?? [], 5);
  const escalasdata = chunked[activePage - 1];

  return (
    <>
      <Table className='border-b'>
        <TableHeader className='p-2 text-xs bg-blue-200 border-t-0 dark:bg-slate-900 '>
          <TableRow className='rounded-ss-xl'>
            <TableHead>Data</TableHead>
            <TableHead>Ano</TableHead>
            <TableHead>Dias no Porto</TableHead>
            <TableHead>Porto</TableHead>
            <TableHead>Entraram</TableHead>
            <TableHead>Saíram</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {escalasdata?.map((escala) => (
            <TableRow
              className='cursor-pointer hover:bg-blue-100'
              key={escala.id}
              onClick={(e) => {
                setRelacMercadoriaEscala(escala.relac_mercadoria_escala);
                setEscalaId(escala.id);
                setOpen(true);
              }}
            >
              <TableCell className='text-xs font-medium'>
                {dayjs.tz(escala.data_escala, 'UTC').format('DD/MM/YYYY')}
              </TableCell>
              <TableCell className='text-xs font-medium'>
                {escala.ano}
              </TableCell>
              <TableCell className='text-xs font-medium'>
                {escala.dias_porto}
              </TableCell>
              <TableCell className='text-xs font-medium '>
                {escala.porto.nome}
              </TableCell>
              <TableCell className='text-xs font-medium'>
                {escala.entrada_de_passageiros}
              </TableCell>
              <TableCell className='text-xs font-medium'>
                {escala.saida_de_passageiros}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Paginacao chunked={chunked} activePage={activePage} setPage={setPage} />
      <MercadoriaEscalasDrawer
        open={open}
        setOpen={setOpen}
        escala_id={escala_id}
      />
    </>
  );
}
