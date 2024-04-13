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
import { IconX } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
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

import { useState } from 'react';
import fetcher from '@/lib/fetch';

export default function PersonRelacaoEmbarcacaoTable(props: {
  pessoa: Pessoa | undefined;
  mutatePessoa: () => void;
}) {
  const { pessoa, mutatePessoa } = props;
  const [deleting, setDeleting] = useState(false);

  async function handleDeleteOwner(id: number) {
    setDeleting(true);
    await fetcher(`/api/embarcacao/delete/owner`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
    mutatePessoa();
    setDeleting(false);
  }

  return (
    <div className='shadow-xl rounded-xl'>
      <Table className='shadow-xl'>
        <TableHeader className='bg-blue-200 p-2  text-xs border-t-0 '>
          <TableRow className='rounded-ss-xl'>
            <TableHead>ID embarcação</TableHead>
            <TableHead>Embarcação</TableHead>
            <TableHead>Início</TableHead>
            <TableHead>Fim</TableHead>
            <TableHead>País</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pessoa?.relacao_embarcacao_proprietario?.map((relacao) => (
            <TableRow key={relacao.id}>
              <TableCell className='font-medium text-xs px-4 py-0'>
                {relacao.embarcacao.id}
              </TableCell>
              <TableCell className='text-xs px-4 py-0'>
                {relacao.embarcacao.nome}
              </TableCell>
              <TableCell className='text-xs px-4 py-0'>
                {dayjs(relacao.data_inicio).format('DD/MM/YYYY')}
              </TableCell>
              <TableCell className='text-xs px-4 py-0'>
                {dayjs(relacao.data_fim).format('DD/MM/YYYY')}
              </TableCell>

              <TableCell className='text-xs px-4 py-0'>
                {relacao.pais.pais}
              </TableCell>
              <TableCell className='text-xs px-4 py-0'>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size='icon'
                      variant='link'
                      className='text-xs text-blue-500'
                      onClick={() => {
                        console.log('edit');
                      }}
                    >
                      <IconX className='w-4 text-red-700' />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Tem a certeza?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Esta ação irá remover o
                        proprietário da embarcação.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className='bg-red-500 hover:bg-red-600'
                        disabled={deleting}
                        onClick={() => handleDeleteOwner(relacao.id)}
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
        {pessoa?.relacao_embarcacao_proprietario?.length === 0 && (
          <TableCaption className='p-4'>
            Nenhum proprietário encontrado
          </TableCaption>
        )}
      </Table>
    </div>
  );
}
