import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import ButtonNewMerch from '../buttons/buttonnewmerch';
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
import { XIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Loader from '@/components/loader';

export default function TableMercadorias(props: {
  mercadorias: RelacMercadoriaViagem[] | undefined;
  viagem_id: number | undefined;
  mutate: () => void;
}) {
  const { mercadorias, viagem_id, mutate } = props;
  const [deleting, setDeleting] = useState(false);

  async function handleDeleteMercadoria(id: number) {
    setDeleting(true);
    await fetch(`/api/viagem/delete/mercadoria`, {
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
      <Table>
        <TableHeader className='p-2 text-xs bg-blue-200 border-t-0 '>
          <TableRow className='rounded-ss-xl'>
            <TableHead>Qt.</TableHead>
            <TableHead>Mercadoria</TableHead>
            <TableHead>Unid. Medida</TableHead>
            <TableHead>Frete</TableHead>
            <TableHead>Cosignatário</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mercadorias?.map((mercadoria) => (
            <TableRow
              className='cursor-pointer hover:bg-blue-100'
              key={mercadoria.id}
            >
              <TableCell className='text-xs font-medium'>
                {mercadoria.quantidade_origem}
              </TableCell>
              <TableCell className='text-xs font-medium'>
                {mercadoria.mercadoria?.nome}
              </TableCell>
              <TableCell className='text-xs font-medium'>
                {mercadoria?.unidade_de_medida?.unidade_medida}
              </TableCell>
              <TableCell className='text-xs font-medium'>
                {/* format value as brazilian real */}
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(mercadoria.valor_frete)}
              </TableCell>
              <TableCell className='text-xs font-medium'>
                {mercadoria.cosignatario?.nome}
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
                        onClick={() => handleDeleteMercadoria(mercadoria.id)}
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
            <TableCell colSpan={1} className='text-xs font-bold'>
              Total:{' '}
              {mercadorias?.reduce(
                (acc, mercadoria) => acc + (mercadoria.quantidade_origem || 0),
                0
              ) || 0}
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>

            <TableCell colSpan={1} className='text-xs font-bold'>
              Total:{' '}
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(
                mercadorias?.reduce(
                  (acc, mercadoria) => acc + (mercadoria.valor_frete || 0),
                  0
                ) || 0
              )}
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <ButtonNewMerch mutate={mutate} viagem_id={viagem_id} />
    </>
  );
}
