import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import fetcher from '@/lib/fetch';
import { Dispatch, SetStateAction, useState } from 'react';
import useSWR from 'swr';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
import { toast } from '@/components/ui/use-toast';

export default function PortoDetails(props: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  porto_id: number | undefined;
  mutate: () => void;
}) {
  const { open, setOpen, porto_id, mutate } = props;
  const [deleting, setDeleting] = useState(false);

  const {
    data: porto,
    isLoading,
    mutate: mutatePorto,
  } = useSWR<Porto>(
    porto_id ? `/api/porto/read/byid?id=${porto_id}` : null,
    fetcher
  );

  async function handleDeletePorto(id: number | undefined) {
    setDeleting(true);
    await fetch(`/api/porto/delete`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
    mutate();
    toast({
      className: 'bg-green-200',
      title: 'Sucesso',
      duration: 5000,
      description: 'Porto removido com sucesso',
    });
    setDeleting(false);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='  w-11/12 p-6 rounded-lg max-h-[95%] overflow-y-scroll'>
        <DialogHeader>
          <DialogTitle>
            {isLoading ? (
              <div className='flex items-center justify-center'>
                <Loader classProp='w-24 h-24' />
              </div>
            ) : (
              'Embarcação #' + porto_id
            )}
          </DialogTitle>
        </DialogHeader>
        {!isLoading && (
          <>
            <div className='flex flex-wrap gap-2'>
              <div className='flex flex-col gap-1 rounded-xl border w-full'>
                <div className='p-2 text-sm bg-blue-200 rounded-ss-xl rounded-se-xl'>
                  Nome
                </div>
                <div className='p-2 text-xs'>{porto?.nome}</div>
              </div>
              <div className='flex flex-col border gap-1 rounded-xl w-full'>
                <div className='p-2 text-sm bg-blue-200 rounded-ss-xl rounded-se-xl'>
                  País
                </div>
                <div className='p-2 text-xs'>{porto?.pais?.pais}</div>
              </div>
              <div className='flex flex-col border gap-1 rounded-xl w-full'>
                <div className='p-2 text-sm bg-blue-200 rounded-ss-xl rounded-se-xl'>
                  Viagens de Origem
                </div>
                <div className='flex-1 max-w-xs  md:max-w-full rounded-ss-xl rounded-se-xl p-2'>
                  <Table>
                    <TableHeader className='p-2 text-xs bg-blue-200 '>
                      <TableRow className='rounded-ss-xl'>
                        <TableHead>ID</TableHead>
                        <TableHead>Embarcação</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {porto?.viagem_origem.map((viagem) => (
                        <TableRow key={viagem.id}>
                          <TableCell className='text-xs font-medium'>
                            {viagem.id}
                          </TableCell>
                          <TableCell className='text-xs'>
                            {viagem.embarcacao.nome}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    {porto?.viagem_origem.length === 0 && (
                      <TableCaption>
                        Nenhuma viagem de origem encontrada
                      </TableCaption>
                    )}
                  </Table>
                </div>
              </div>

              {/* DESTINO */}
              <div className='flex flex-col border gap-1 rounded-xl w-full'>
                <div className='p-2 text-sm bg-blue-200 rounded-ss-xl rounded-se-xl'>
                  Viagens de Destino
                </div>
                <div className='flex-1 max-w-xs  md:max-w-full rounded-ss-xl rounded-se-xl p-2'>
                  <Table>
                    <TableHeader className='p-2 text-xs bg-blue-200 '>
                      <TableRow className='rounded-ss-xl'>
                        <TableHead>ID</TableHead>
                        <TableHead>Embarcação</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {porto?.viagem_destino.map((viagem) => (
                        <TableRow key={viagem.id}>
                          <TableCell className='text-xs font-medium'>
                            {viagem.id}
                          </TableCell>
                          <TableCell className='text-xs'>
                            {viagem.embarcacao.nome}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    {porto?.viagem_destino.length === 0 && (
                      <TableCaption>
                        Nenhuma viagem de origem encontrada
                      </TableCaption>
                    )}
                  </Table>
                </div>
              </div>
            </div>
          </>
        )}

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant='destructive'>Deletar Porto</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className='text-red-500'>
                Tem a certeza?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Esta ação não pode ser desfeita. Esta ação irá remover o porto.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                disabled={deleting}
                className='bg-red-500 hover:bg-red-600'
                onClick={() => handleDeletePorto(porto_id)}
              >
                {deleting && <Loader classProp='w-4 h-4 mr-2' />} Remover
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DialogContent>
    </Dialog>
  );
}
