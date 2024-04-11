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
import fetcher from '@/lib/fetch';
import useSWR from 'swr';

export default function PessoasPage() {
  const { data: pessoas, isLoading } = useSWR<Pessoa[]>(
    '/api/pessoa/read',
    fetcher
  );

  return (
    <main className='flex p-4 border-gray-300 border-solid border-2 rounded-3xl mx-10 md:mx-24 mt-5 shadow-lg '>
      <Table>
        <TableHeader className='bg-blue-200 p-2  text-xs '>
          <TableRow className='rounded-ss-xl'>
            <TableHead>Nome</TableHead>
            <TableHead>Título Nobreza</TableHead>
            <TableHead>País</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pessoas?.map((pessoa) => (
            <TableRow key={pessoa.id}>
              <TableCell className='font-medium text-xs'>
                {pessoa.nome}
              </TableCell>
              <TableCell className='text-xs'>
                {pessoa?.titulo_nobreza?.titulo}
              </TableCell>
              <TableCell className='text-xs'>{pessoa?.pais?.pais}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        {pessoas?.length === 0 && (
          <TableCaption>Nenhum proprietário encontrado</TableCaption>
        )}
      </Table>
    </main>
  );
}
