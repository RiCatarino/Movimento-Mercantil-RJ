'use client';

import Paginacao from '@/components/sharedpagination';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import chunk from '@/lib/chunk';
import dayjs from 'dayjs';
import { useState } from 'react';

interface PessoasTableProps {
  embarcacao: Embarcacao;
}

export const PessoasTable: React.FC<PessoasTableProps> = ({ embarcacao }) => {
  const [activePagePessoas, setPagePessoas] = useState(1);
  const chunkedpessoas = chunk(
    embarcacao?.relacao_embarcacao_proprietario ?? [],
    5
  );
  const pessoas = chunkedpessoas[activePagePessoas - 1];

  return (
    <>
      <Table>
        <TableHeader className='p-2 text-xs bg-blue-200  dark:bg-slate-900'>
          <TableRow className='rounded-ss-xl'>
            <TableHead>Pessoa</TableHead>
            <TableHead>Início</TableHead>
            <TableHead>Fim</TableHead>
            <TableHead>País</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pessoas?.map((relacao: RelacEmbarcacaoProprietario) => (
            <TableRow key={relacao.id}>
              <TableCell className='text-xs font-medium'>
                {relacao.pessoa.nome} | {relacao.pessoa?.pais?.pais}
              </TableCell>
              <TableCell className='text-xs'>
                {dayjs.tz(relacao.data_inicio, 'UTC').format('DD/MM/YYYY')}
              </TableCell>
              <TableCell className='text-xs'>
                {dayjs.tz(relacao.data_fim, 'UTC').format('DD/MM/YYYY')}
              </TableCell>

              <TableCell className='text-xs'>{relacao.pais.pais}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        {embarcacao?.relacao_embarcacao_proprietario?.length === 0 && (
          <TableCaption>Nenhum proprietário encontrado</TableCaption>
        )}
      </Table>
      <Paginacao
        chunked={chunkedpessoas}
        activePage={activePagePessoas}
        setPage={setPagePessoas}
      />
    </>
  );
};

export default PessoasTable;
