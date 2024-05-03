import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState } from 'react';
import Loader from '@/components/loader';

export default function TableNews(props: {
  news: Noticia[] | undefined;
  mutate: () => void;
}) {
  const { news, mutate } = props;
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
            <TableHead>Assunto</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {news?.map((ref) => (
            <TableRow className='cursor-pointer hover:bg-blue-100' key={ref.id}>
              <TableCell className='text-xs font-medium'>
                {ref.assunto}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
