import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import dayjs from 'dayjs';
import { useState } from 'react';
import Loader from '@/components/loader';
import ButtonNewRef from './buttonnewref';

export default function TableRefDocumental(props: {
  viagem_id: number | undefined;
  refdocs: RelacViagemReferenciaDoc[] | undefined;
  mutate: () => void;
}) {
  const { refdocs, mutate } = props;
  const [deleting, setDeleting] = useState(false);
  // async function handleDeleteEscala(id: number) {
  //   setDeleting(true);
  //   await fetch(`/api/escala/delete`, {
  //     method: 'DELETE',
  //     body: JSON.stringify({ id }),
  //   });
  //   mutate();
  //   setDeleting(false);
  // }

  if (deleting) {
    return <Loader classProp='w-10 h-10' />;
  }

  return (
    <>
      <Table className='border-b'>
        <TableHeader className='p-2 text-xs bg-blue-200 border-t-0 '>
          <TableRow className='rounded-ss-xl'>
            <TableHead>Data de Publicação</TableHead>
            <TableHead>Nome do Periódico</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {refdocs?.map((ref) => (
            <TableRow className='cursor-pointer hover:bg-blue-100' key={ref.id}>
              <TableCell className='text-xs font-medium'>
                {dayjs(ref.data_publicacao).format('DD-MM-YYYY')}
              </TableCell>
              <TableCell className='text-xs font-medium'>
                {ref.referencia_documental?.nome_periodico}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ButtonNewRef mutate={mutate} viagem_id={1} />
    </>
  );
}
