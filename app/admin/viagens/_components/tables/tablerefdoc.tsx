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
import { useState } from 'react';
import Loader from '@/components/loader';
import ButtonNewRef from '../buttons/buttonnewref';
import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
export default function TableRefDocumental(props: {
  viagem_id: number | undefined;
  refdocs: RelacViagemReferenciaDoc[] | undefined;
  mutate: () => void;
}) {
  const { refdocs, mutate, viagem_id } = props;
  const [deleting, setDeleting] = useState(false);

  async function handleDeleteRef(id: number) {
    setDeleting(true);
    await fetch(`/api/referencia_documental/delete`, {
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
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size='icon'
                      variant='link'
                      className='text-xs text-blue-500'
                    >
                      <XIcon className='w-4 text-red-700' />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className='text-red-500'>
                        Tem a certeza?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Esta ação irá remover a
                        referência documental.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        disabled={deleting}
                        className='bg-red-500 hover:bg-red-600'
                        onClick={() =>
                          handleDeleteRef(ref.referencia_documental.id)
                        }
                      >
                        {deleting ? 'Aguarde...' : 'Remover'}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {refdocs?.length === 0 && (
          <TableCaption>Nenhuma referência documental encontrada</TableCaption>
        )}
      </Table>
      <ButtonNewRef mutate={mutate} viagem_id={viagem_id} />
    </>
  );
}
