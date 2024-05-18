import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import fetcher from '@/lib/fetch';
import { Dispatch, SetStateAction, useState } from 'react';
import useSWR from 'swr';
import AddOwner from './addownerbutton';
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
import Loader from '@/components/loader';
import { XIcon } from 'lucide-react';
import Paginacao from '@/components/sharedpagination';
import chunk from '@/lib/chunk';

export default function VesselDetails(props: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  embarcacao_id: number | undefined;
}) {
  const { open, setOpen, embarcacao_id } = props;
  const [deleting, setDeleting] = useState(false);
  const [activePage, setPage] = useState(1);

  const {
    data: embarcacao,
    isLoading,
    mutate: mutateEmbarcacao,
  } = useSWR<Embarcacao>(
    embarcacao_id ? `/api/embarcacao/read/byid?id=${embarcacao_id}` : null,
    fetcher
  );

  const chunked = chunk(embarcacao?.relacao_embarcacao_proprietario ?? [], 5);
  const embarcacoes = chunked[activePage - 1];

  async function handleDeleteOwner(id: number) {
    setDeleting(true);
    await fetcher(`/api/embarcacao/delete/owner`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
    mutateEmbarcacao();
    setDeleting(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className=' min-w-[50%] w-11/12 p-6 rounded-lg max-h-[95%] overflow-y-scroll'>
        <DialogHeader>
          <DialogTitle>
            {isLoading ? (
              <div className='flex items-center justify-center'>
                <Loader classProp='w-24 h-24' />
              </div>
            ) : (
              'Embarcação #' + embarcacao_id
            )}
          </DialogTitle>
        </DialogHeader>
        {!isLoading && (
          <>
            <div className='flex flex-wrap gap-2'>
              <div className='flex flex-col gap-1 rounded-xl border min-w-[50%]'>
                <div className='p-2 text-sm bg-blue-200 rounded-ss-xl rounded-se-xl'>
                  Nome
                </div>
                <div className='p-2 text-xs'>{embarcacao?.nome}</div>
              </div>
              <div className='flex flex-col border gap-1 rounded-xl grow'>
                <div className='p-2 text-sm bg-blue-200 rounded-ss-xl rounded-se-xl'>
                  Tipo
                </div>
                <div className='p-2 text-xs'>
                  {embarcacao?.tipo_embarcacao.tipo}
                </div>
              </div>
              <div className='flex flex-col border gap-1 rounded-xl grow'>
                <div className='p-2 text-sm bg-blue-200 rounded-ss-xl rounded-se-xl'>
                  Descrição
                </div>
                <div className='p-2 text-xs'>
                  {embarcacao?.tipo_embarcacao.texto_descritivo}
                </div>
              </div>
              {embarcacao?.tipo_embarcacao?.imagem_embarcacao &&
                embarcacao?.tipo_embarcacao?.imagem_embarcacao.length > 0 && (
                  <div className='flex flex-col gap-2 p-2'>
                    <div className='flex flex-wrap gap-2'>
                      {embarcacao?.tipo_embarcacao?.imagem_embarcacao?.map(
                        (img) => (
                          <img
                            key={img.id}
                            src={img.imagem}
                            alt={embarcacao?.tipo_embarcacao.tipo}
                            className=' max-h-64 md:max-w-96 rounded-lg w-full md:w-auto border '
                          />
                        )
                      )}
                    </div>
                  </div>
                )}
              <div className='flex flex-col w-full border gap-1 rounded-xl'>
                <div className='p-2 text-sm bg-blue-200 rounded-ss-xl rounded-se-xl'>
                  Observação
                </div>
                <div className='p-2 text-xs'>{embarcacao?.observacao}</div>
              </div>
              <div className='flex-1 max-w-xs  md:max-w-full rounded-ss-xl rounded-se-xl'>
                <Table>
                  <TableHeader className='p-2 text-xs bg-blue-200 '>
                    <TableRow className='rounded-ss-xl'>
                      <TableHead>Pessoa</TableHead>
                      <TableHead>Início</TableHead>
                      <TableHead>Fim</TableHead>
                      <TableHead>País</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {embarcacoes?.map((relacao) => (
                      <TableRow key={relacao.id}>
                        <TableCell className='text-xs font-medium'>
                          {relacao.pessoa.nome} | {relacao.pessoa?.pais?.pais}
                        </TableCell>
                        <TableCell className='text-xs'>
                          {dayjs(relacao.data_inicio).format('DD/MM/YYYY')}
                        </TableCell>
                        <TableCell className='text-xs'>
                          {dayjs(relacao.data_fim).format('DD/MM/YYYY')}
                        </TableCell>

                        <TableCell className='text-xs'>
                          {relacao.pais.pais}
                        </TableCell>
                        <TableCell>
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
                                  Esta ação não pode ser desfeita. Esta ação irá
                                  remover o proprietário da embarcação.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  disabled={deleting}
                                  className='bg-red-500 hover:bg-red-600'
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
                  {embarcacao?.relacao_embarcacao_proprietario.length === 0 && (
                    <TableCaption>Nenhum proprietário encontrado</TableCaption>
                  )}
                </Table>
                <Paginacao
                  chunked={chunked}
                  activePage={activePage}
                  setPage={setPage}
                />
              </div>
            </div>
            <AddOwner mutate={mutateEmbarcacao} embarcacaoId={embarcacao_id} />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
