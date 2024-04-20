import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import fetcher from '@/lib/fetch';
import { Dispatch, SetStateAction, useState } from 'react';
import useSWR from 'swr';
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
} from '@/components/ui/alert-dialog'; // import AddOwner from './addownerbutton';
import { toast } from 'sonner';
import dayjs from 'dayjs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import TableEscalas from './tableescalas';
import TableMercadorias from './tablemercadorias';
import Loader from '@/components/loader';
import { Trash } from 'lucide-react';
import BotaoNovaeEscala from './botaonovaescala';

export default function TripDetails(props: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  viagem_id: number | undefined;
  mutate: () => void;
}) {
  const { open, setOpen, viagem_id, mutate } = props;
  const [deleting, setDeleting] = useState(false);
  const {
    data: viagem,
    isLoading,
    mutate: mutateViagem,
  } = useSWR<Viagem>(
    viagem_id ? `/api/viagem/read/byid?id=${viagem_id}` : null,
    fetcher
  );

  async function handleDeletePerson(id: number) {
    setDeleting(true);
    const result = await fetch(`/api/pessoa/delete`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
    if (result.ok) {
      mutate();
      toast.success('Pessoa removida com sucesso');
      setOpen(false);
    } else {
      toast.error('Erro ao remover pessoa');
    }
    setDeleting(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className=' min-w-[75%] w-11/12 p-6 rounded-lg max-h-[95%] overflow-y-scroll'>
        <DialogHeader>
          <DialogTitle className={isLoading ? 'h-64' : ''}>
            {isLoading ? <Loader /> : 'Viagem #' + viagem_id}
          </DialogTitle>
        </DialogHeader>
        {!isLoading && (
          <>
            <div className='flex flex-wrap gap-2'>
              <div className='flex flex-col gap-1 rounded-xl border '>
                <div className='bg-blue-200 p-2 rounded-ss-xl rounded-se-xl text-sm'>
                  Data de Partida
                </div>
                <div className='p-2 text-xs'>
                  {dayjs(viagem?.data_viagem).format('DD/MM/YYYY')}
                </div>
              </div>
              <div className='flex flex-col gap-1 rounded-xl border grow'>
                <div className='bg-blue-200 p-2 rounded-ss-xl rounded-se-xl text-sm'>
                  Data de Chegada
                </div>
                <div className='p-2 text-xs'>
                  {dayjs(viagem?.data_chegada).format('DD/MM/YYYY')}
                </div>
              </div>

              <div className='flex flex-col gap-1 rounded-xl border grow'>
                <div className='bg-blue-200 p-2 rounded-ss-xl rounded-se-xl text-sm'>
                  Dias de Viagem
                </div>
                <div className='p-2 text-xs'>{viagem?.dias_viagem}</div>
              </div>
              <div className='flex flex-col gap-1 rounded-xl border grow'>
                <div className='bg-blue-200 p-2 rounded-ss-xl rounded-se-xl text-sm'>
                  Tripulação
                </div>
                <div className='p-2 text-xs'>{viagem?.tripulacao}</div>
              </div>
              <div className='flex flex-col gap-1 rounded-xl border grow'>
                <div className='bg-blue-200 p-2 rounded-ss-xl rounded-se-xl text-sm'>
                  Passageiros
                </div>
                <div className='p-2 text-xs'>{viagem?.total_passageiros}</div>
              </div>
              <div className='flex flex-col gap-1 rounded-xl border grow'>
                <div className='bg-blue-200 p-2 rounded-ss-xl rounded-se-xl text-sm'>
                  Porto Origem
                </div>
                <div className='p-2 text-xs'>{viagem?.porto_origem?.nome}</div>
              </div>
              <div className='flex flex-col gap-1 rounded-xl border grow'>
                <div className='bg-blue-200 p-2 rounded-ss-xl rounded-se-xl text-sm'>
                  Porto Destino
                </div>
                <div className='p-2 text-xs'>{viagem?.porto_destino?.nome}</div>
              </div>
            </div>

            <div className=' max-w-xs md:max-w-full flex-1 flex w-full '>
              <Accordion
                type='single'
                collapsible
                className='flex flex-1 w-full flex-col'
              >
                <AccordionItem value='vessel' className='w-full'>
                  <AccordionTrigger>Embarcação</AccordionTrigger>
                  <AccordionContent>
                    <div className='flex flex-row flex-1 gap-2'>
                      <div className='flex flex-col gap-1 rounded-xl border grow'>
                        <div className='bg-blue-200 p-2 rounded-ss-xl rounded-se-xl text-sm'>
                          Nome
                        </div>
                        <div className='p-2 text-xs'>
                          {viagem?.embarcacao?.nome}
                        </div>
                      </div>
                      <div className='flex flex-col gap-1 rounded-xl border grow'>
                        <div className='bg-blue-200 p-2 rounded-ss-xl rounded-se-xl text-sm'>
                          Tipo
                        </div>
                        <div className='p-2 text-xs'>
                          {viagem?.embarcacao?.tipo_embarcacao?.tipo}
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-col gap-1 rounded-xl border grow mt-2'>
                      <div className='bg-blue-200 p-2 rounded-ss-xl rounded-se-xl text-sm'>
                        Descrição
                      </div>
                      <div className='p-2 text-xs'>
                        {viagem?.embarcacao?.tipo_embarcacao?.texto_descritivo}
                      </div>
                    </div>
                    <div className='flex flex-col gap-1 rounded-xl border w-full mt-2'>
                      <div className='bg-blue-200 p-2 rounded-ss-xl rounded-se-xl text-sm'>
                        Observação
                      </div>
                      <div className='p-2 text-xs'>
                        {viagem?.embarcacao?.observacao}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value='crew' className='w-full'>
                  <AccordionTrigger>Tripulação</AccordionTrigger>
                  <AccordionContent>
                    <div className='flex flex-row flex-1 gap-2'>
                      <div className='flex flex-col gap-1 rounded-xl border grow'>
                        <div className='bg-blue-200 p-2 rounded-ss-xl rounded-se-xl text-sm'>
                          Comandante
                        </div>
                        <div className='p-2 text-xs'>
                          {viagem?.comandante?.nome}
                        </div>
                      </div>
                      <div className='flex flex-col gap-1 rounded-xl border grow'>
                        <div className='bg-blue-200 p-2 rounded-ss-xl rounded-se-xl text-sm'>
                          Capitão
                        </div>
                        <div className='p-2 text-xs'>
                          {viagem?.capitao?.nome}
                        </div>
                      </div>
                      <div className='flex flex-col gap-1 rounded-xl border grow'>
                        <div className='bg-blue-200 p-2 rounded-ss-xl rounded-se-xl text-sm'>
                          Armador
                        </div>
                        <div className='p-2 text-xs'>
                          {viagem?.armador?.nome}
                        </div>
                      </div>
                      <div className='flex flex-col gap-1 rounded-xl border grow'>
                        <div className='bg-blue-200 p-2 rounded-ss-xl rounded-se-xl text-sm'>
                          Mestre
                        </div>
                        <div className='p-2 text-xs'>
                          {viagem?.mestre?.nome}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value='Escalas' className='w-full'>
                  <AccordionTrigger>Escalas</AccordionTrigger>
                  <AccordionContent>
                    <TableEscalas escalas={viagem?.escala} />
                    <BotaoNovaeEscala
                      mutate={mutateViagem}
                      viagem_id={viagem_id}
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value='cargo' className='w-full'>
                  <AccordionTrigger>Mercadoria</AccordionTrigger>
                  <AccordionContent>
                    <TableMercadorias
                      mercadorias={viagem?.relac_mercadoria_viagem}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <AlertDialog>
              <AlertDialogTrigger className='w-full' asChild>
                <Button variant='destructive' className=' w-full'>
                  Remover <Trash className='ml-2 w-5 h-5' />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Tem a certeza?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta ação não pode ser desfeita. Esta ação irá remover a
                    pessoa!
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className='bg-red-500 hover:bg-red-600'
                    disabled={deleting}
                    onClick={() => {
                      if (viagem?.id) handleDeletePerson(viagem?.id);
                    }}
                  >
                    {deleting ? 'Aguarde...' : 'Remover'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}
        {/* <AddOwner mutate={mutateEmbarcacao} embarcacaoId={embarcacao_id} /> */}
      </DialogContent>
    </Dialog>
  );
}
