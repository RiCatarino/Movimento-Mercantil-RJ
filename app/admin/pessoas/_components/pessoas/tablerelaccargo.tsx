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
import { XIcon } from 'lucide-react';

var customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

export default function TabelaPessoaCargo(props: {
  pessoa: Pessoa | undefined;
  mutatePessoa: () => void;
}) {
  const { pessoa, mutatePessoa } = props;
  const [deleting, setDeleting] = useState(false);

  async function handleDeleteCargo(id: number) {
    setDeleting(true);
    await fetcher(`/api/cargo/delete`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
    mutatePessoa();
    setDeleting(false);
  }

  return (
    <div className='flex-1 max-w-xs  md:max-w-full rounded-ss-xl rounded-se-xl'>
      <Table className='shadow-xl'>
        <TableHeader className='p-2 text-xs bg-blue-200 border-t-0 '>
          <TableRow className='rounded-ss-xl'>
            <TableHead>Cargo</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Ano</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pessoa?.relacao_pessoa_cargo?.map((relacao) => (
            <TableRow key={relacao.id}>
              <TableCell className='px-4 py-0 text-xs font-medium'>
                {relacao.cargo?.cargo}
              </TableCell>
              <TableCell className='px-4 py-0 text-xs'>
                {relacao.data_cargo
                  ? dayjs(relacao.data_cargo).format('DD/MM/YYYY')
                  : 'N/A'}
              </TableCell>
              <TableCell className='px-4 py-0 text-xs'>
                {relacao.ano || 'N/A'}
              </TableCell>
              <TableCell className='px-4 py-0 text-xs'>
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
                      <XIcon className='w-4 text-red-700' />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Tem a certeza?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Esta ação irá remover o
                        cargo da pessoa.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        className='bg-red-500 hover:bg-red-600'
                        disabled={deleting}
                        onClick={() => handleDeleteCargo(relacao.id)}
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
            Nenhum registo de cargo encontrado
          </TableCaption>
        )}
      </Table>
    </div>
  );
}
