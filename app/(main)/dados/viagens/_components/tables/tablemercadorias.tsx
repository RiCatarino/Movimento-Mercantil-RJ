'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState } from 'react';
import Paginacao from '@/components/sharedpagination';
import chunk from '@/lib/chunk';

export default function TableMercadorias(props: {
  mercadorias: RelacMercadoriaViagem[] | undefined;
  viagem_id: number | undefined;
}) {
  const { mercadorias } = props;
  const [activePage, setPage] = useState(1);

  const chunked = chunk(mercadorias ?? [], 5);
  const mercadoriasdata = chunked[activePage - 1];

  return (
    <>
      <Table>
        <TableHeader className='p-2 text-xs bg-blue-200 border-t-0 dark:bg-slate-900 '>
          <TableRow className='rounded-ss-xl'>
            <TableHead>Qt.</TableHead>
            <TableHead>Mercadoria</TableHead>
            <TableHead>Unid. Medida</TableHead>
            <TableHead>Frete</TableHead>
            <TableHead>Cosignatário</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mercadoriasdata?.map((mercadoria) => (
            <TableRow
              className='cursor-pointer hover:bg-blue-100'
              key={mercadoria.id}
            >
              <TableCell className='text-xs font-medium'>
                {mercadoria.quantidade_origem}
              </TableCell>
              <TableCell className='text-xs font-medium'>
                {mercadoria.mercadoria?.nome}
              </TableCell>
              <TableCell className='text-xs font-medium'>
                {mercadoria?.unidade_de_medida?.unidade_medida}
              </TableCell>
              <TableCell className='text-xs font-medium'>
                {/* format value as brazilian real */}
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(mercadoria.valor_frete)}
              </TableCell>
              <TableCell className='text-xs font-medium'>
                {mercadoria.cosignatario?.nome}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={1} className='text-xs font-bold'>
              Total:{' '}
              {mercadorias?.reduce(
                (acc, mercadoria) => acc + (mercadoria.quantidade_origem || 0),
                0
              ) || 0}
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>

            <TableCell colSpan={1} className='text-xs font-bold'>
              Total:{' '}
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(
                mercadorias?.reduce(
                  (acc, mercadoria) => acc + (mercadoria.valor_frete || 0),
                  0
                ) || 0
              )}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <Paginacao chunked={chunked} activePage={activePage} setPage={setPage} />
    </>
  );
}
