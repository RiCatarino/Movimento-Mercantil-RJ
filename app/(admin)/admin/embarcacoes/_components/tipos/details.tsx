import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import fetcher from '@/lib/fetch';
import { Dispatch, SetStateAction } from 'react';
import useSWR from 'swr';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import Loader from '@/components/loader';
import BotaoNovaImagem from './buttonnewimage';
import chunk from '@/lib/chunk';
import Paginacao from '@/components/sharedpagination';
import { useState } from 'react';
import { XIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export default function TipoDetails(props: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  tipo_id: number | undefined;
}) {
  const { open, setOpen, tipo_id } = props;
  const [activePage, setPage] = useState(1);

  const {
    data: tipo,
    isLoading,
    mutate: mutate,
  } = useSWR<TipoEmbarcacao>(
    tipo_id ? `/api/tipo_embarcacao/read/byid?id=${tipo_id}` : null,
    fetcher
  );

  const chunked = chunk(tipo?.embarcacao ?? [], 5);
  const embarcacoes = chunked[activePage - 1];

  async function handleDeleteImage(id: number) {
    await fetch(`/api/imagem_embarcacao/delete`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
    mutate();
    toast({
      className: 'bg-green-200',
      title: 'Sucesso',
      duration: 5000,
      description: 'Imagem removida com sucesso',
    });
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
              'Tipo #' + tipo_id
            )}
          </DialogTitle>
        </DialogHeader>
        {!isLoading && (
          <>
            <div className='flex flex-wrap gap-2'>
              <div className='flex flex-col w-full border gap-1 rounded-xl'>
                <div className='p-2 text-sm bg-blue-200 dark:bg-slate-900 rounded-ss-xl rounded-se-xl'>
                  Tipo
                </div>
                <div className='p-2 text-xs'>{tipo?.tipo}</div>
              </div>

              <div className='flex flex-col w-full border gap-1 rounded-xl'>
                <div className='p-2 text-sm bg-blue-200 dark:bg-slate-900 rounded-ss-xl rounded-se-xl'>
                  Descrição
                </div>
                <div className='p-2 text-xs'>{tipo?.texto_descritivo}</div>
              </div>

              <div className='flex flex-col w-full border gap-1 rounded-xl'>
                <div className='p-2 text-sm bg-blue-200 dark:bg-slate-900 rounded-ss-xl rounded-se-xl'>
                  Imagens
                </div>
                <div className='flex flex-col p-2 gap-2'>
                  <div className='flex flex-wrap gap-2'>
                    {tipo?.imagem_embarcacao.map((img) => (
                      // { X Button in upper right corner of the image}
                      <div className='relative' key={img.id}>
                        <button
                          className='absolute p-1 bg-red-500 rounded-full -top-1 -right-1'
                          onClick={() => handleDeleteImage(img.id)}
                        >
                          <XIcon className='text-white ' />
                        </button>
                        <img
                          src={img.imagem}
                          alt={tipo.tipo}
                          className='w-full border rounded-lg  max-h-64 md:max-w-96 md:w-auto'
                        />
                      </div>
                    ))}
                  </div>
                  <BotaoNovaImagem mutate={mutate} tipo_id={tipo?.id} />
                </div>
              </div>

              <div className='flex-1 max-w-xs  md:max-w-full rounded-ss-xl rounded-se-xl'>
                <Table>
                  <TableHeader className='p-2 text-xs bg-blue-200 dark:bg-slate-900 '>
                    <TableRow className='rounded-ss-xl'>
                      <TableHead>ID</TableHead>
                      <TableHead>Nome</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {embarcacoes?.map((embarcacao) => (
                      <TableRow key={embarcacao.id}>
                        <TableCell className='text-xs font-medium'>
                          {embarcacao.id}
                        </TableCell>
                        <TableCell className='text-xs'>
                          {embarcacao.nome}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Paginacao
                  chunked={chunked}
                  activePage={activePage}
                  setPage={setPage}
                />
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
