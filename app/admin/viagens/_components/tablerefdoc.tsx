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
import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';

export default function TableRefDocumental(props: {
  viagem_id: number | undefined;
  refdocs: RelacViagemReferenciaDoc[] | undefined;
  mutate: () => void;
}) {
  const { refdocs, mutate, viagem_id } = props;
  const [deleting, setDeleting] = useState(false);

  async function handleDeleteRef(id: number) {
    setDeleting(true);
    await fetch(`/api/escala/delete`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
    mutate();
    setDeleting(false);
  }

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
            <TableHead></TableHead>
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
              <TableCell className='w-4'>
                <Button
                  variant='link'
                  size='icon'
                  className='rounded-full'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteRef(ref.id);
                  }}
                >
                  <XIcon className='w-4 text-red-600' />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ButtonNewRef mutate={mutate} viagem_id={viagem_id} />
    </>
  );
}
