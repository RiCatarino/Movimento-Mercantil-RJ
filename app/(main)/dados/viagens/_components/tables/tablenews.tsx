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
import { useState } from 'react';
import chunk from '@/lib/chunk';
import Paginacao from '@/components/sharedpagination';

export default function TableNews(props: {
  news: Noticia[] | undefined;
  viagem_id: number | undefined;
}) {
  const { news } = props;
  const [activePage, setPage] = useState(1);
  const chunked = chunk(news ?? [], 5);
  const newsdata = chunked[activePage - 1];

  return (
    <>
      <Table className='border-b'>
        <TableHeader className='p-2 text-xs bg-blue-200 border-t-0 dark:bg-slate-900 '>
          <TableRow className='rounded-ss-xl'>
            <TableHead>Assunto</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {newsdata?.map((noticia) => (
            <TableRow
              className='cursor-pointer hover:bg-blue-100'
              key={noticia.id}
            >
              <TableCell className='text-xs font-medium'>
                {noticia.assunto}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {news?.length === 0 && (
          <TableCaption>Nenhuma notícia encontrada</TableCaption>
        )}
      </Table>
      <Paginacao chunked={chunked} activePage={activePage} setPage={setPage} />
    </>
  );
}
