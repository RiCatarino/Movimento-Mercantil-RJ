import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState } from 'react';
import Loader from '@/components/loader';
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
import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';
import chunk from '@/lib/chunk';
import Paginacao from '@/components/sharedpagination';
import BotaoNovoPassageiro from '../buttons/buttonnovopassageiro';

export default function TablePassageiros(props: {
  passageiros: Passageiro[] | undefined;
  mutate: () => void;
  viagem_id: number | undefined;
}) {
  const { passageiros, mutate, viagem_id } = props;
  const [deleting, setDeleting] = useState(false);
  const [activePage, setPage] = useState(1);

  const chunked = chunk(passageiros ?? [], 5);
  const passageirosdata = chunked[activePage - 1];

  async function handleDeletePassageiro(id: number) {
    setDeleting(true);
    await fetch(`/api/passageiros/delete`, {
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
        <TableHeader className='p-2 text-xs bg-blue-200 border-t-0 dark:bg-slate-900 '>
          <TableRow className='rounded-ss-xl'>
            <TableHead>Tipo</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Observações</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {passageirosdata?.map((passageiro) => (
            <TableRow
              className='cursor-pointer hover:bg-blue-100'
              key={passageiro.id}
            >
              <TableCell className='text-xs font-medium'>
                {passageiro.tipo_passageiro.tipo}
              </TableCell>
              <TableCell className='text-xs'>{passageiro.total}</TableCell>
              <TableCell className='text-xs'>
                {passageiro.observacoes}
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
                        Esta ação não pode ser desfeita. Esta ação irá remover
                        os passageiros.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        disabled={deleting}
                        className='bg-red-500 hover:bg-red-600'
                        onClick={() => handleDeletePassageiro(passageiro.id)}
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

        <TableFooter>
          <TableRow>
            <TableCell></TableCell>
            <TableCell colSpan={3} className='text-xs font-bold'>
              Total:{' '}
              {passageiros?.reduce(
                (acc, passageiro) => acc + (passageiro.total || 0),
                0
              ) || 0}
            </TableCell>
          </TableRow>
        </TableFooter>
        {passageiros?.length === 0 && (
          <TableCaption>
            Não registámos qualquer passageiro nesta viagem
          </TableCaption>
        )}
      </Table>
      <Paginacao chunked={chunked} activePage={activePage} setPage={setPage} />
      <BotaoNovoPassageiro mutate={mutate} viagem_id={viagem_id} />
    </>
  );
}
