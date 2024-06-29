'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import tz from 'dayjs/plugin/timezone';
import { useState } from 'react';
import chunk from '@/lib/chunk';
import Paginacao from '@/components/sharedpagination';

dayjs.extend(utc);
dayjs.extend(tz);

var customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

export default function TabelaPessoaCargo(props: {
  pessoa: Pessoa | undefined;
}) {
  const { pessoa } = props;
  const [activePage, setPage] = useState(1);

  const chunked = chunk(pessoa?.relacao_pessoa_cargo ?? [], 5);
  const pessoadata = chunked[activePage - 1];

  return (
    <div className='flex flex-col md:max-w-full rounded-ss-xl rounded-se-xl gap-4'>
      <Table className='shadow-xl'>
        <TableHeader className='p-2 text-md bg-blue-200 border-t-0 dark:bg-slate-900  '>
          <TableRow className='rounded-ss-xl'>
            <TableHead>Cargo</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Ano</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pessoadata?.map((relacao) => (
            <TableRow key={relacao.id}>
              <TableCell className='px-4 py-2 text-md font-medium'>
                {relacao.cargo?.cargo}
              </TableCell>
              <TableCell className='px-4 py-2 text-md'>
                {relacao.data_cargo
                  ? dayjs.tz(relacao.data_cargo, 'UTC').format('DD/MM/YYYY')
                  : 'N/A'}
              </TableCell>
              <TableCell className='px-4 py-2 text-md'>
                {relacao.ano || 'N/A'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {pessoa?.relacao_pessoa_cargo?.length === 0 && (
          <TableCaption className='p-4'>
            Nenhum registo de cargo encontrado
          </TableCaption>
        )}
      </Table>
      <Paginacao chunked={chunked} activePage={activePage} setPage={setPage} />
    </div>
  );
}
