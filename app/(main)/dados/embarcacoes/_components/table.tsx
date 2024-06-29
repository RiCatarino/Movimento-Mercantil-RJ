'use client';

import React, { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Loader from '@/components/loader';
import useSWR from 'swr';
import fetcher from '@/lib/fetch';
import { Input } from '@/components/ui/input';
import PaginacaoByTotal from '@/components/sharedpaginationbytotal';

type EmbarcacoesAndTotal = {
  embarcacoes: Embarcacao[];
  total: number;
};

function TableEmbarcacoesContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get('nome');
  const [activePage, setPage] = useState(1);
  const [searchText, setSearchText] = useState(name ?? '');
  const router = useRouter();
  const { data, error, isLoading, mutate } = useSWR<EmbarcacoesAndTotal>(
    `/api/embarcacao/read/bynamepagination?nome=${searchText}&page=${activePage}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <Loader classProp='w-24 h-24 self-center flex' />;

  return (
    <div className='flex flex-col p-2 mt-2 border-2 shadow-sm gap-2 rounded-xl bg-white'>
      <div className='flex flex-col-reverse justify-between md:flex-row gap-4'>
        <Input
          id='search'
          value={searchText}
          className='rounded-xl'
          placeholder='Pesquisar por nome...'
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <Table className='bg-white'>
        <TableHeader className='p-2 border-t-0 bg-gradient-to-r from-blue-200 to-blue-400 dark:from-slate-700 dark:to-slate-950'>
          <TableRow>
            <TableHead className='md:w-96'>Nome</TableHead>
            <TableHead className='md:w-96'>Tipo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.embarcacoes?.map((embarcacao) => (
            <TableRow
              className='cursor-pointer hover:bg-blue-100'
              key={embarcacao.id}
              onClick={(e) => {
                router.push(`/dados/embarcacoes/${embarcacao.id}`);
              }}
            >
              <TableCell className='font-medium'>{embarcacao.nome}</TableCell>
              <TableCell className='font-medium'>
                {embarcacao.tipo_embarcacao?.tipo}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginacaoByTotal
        total={data?.total ? Math.ceil(data.total / 10) : 1}
        activePage={activePage}
        setPage={setPage}
      />
      {/* <VesselDetails
        open={open}
        setOpen={setOpen}
        embarcacao_id={embarcacao?.id}
      /> */}
    </div>
  );
}

export default function TableEmbarcacoes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TableEmbarcacoesContent />
    </Suspense>
  );
}
