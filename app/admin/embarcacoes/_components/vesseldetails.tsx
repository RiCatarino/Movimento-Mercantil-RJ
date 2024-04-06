import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import fetcher from '@/lib/fetch';
import { Dispatch, SetStateAction } from 'react';
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

export default function VesselDetails(props: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  embarcacao_id: number | undefined;
  mutate: () => void;
}) {
  const { open, setOpen, embarcacao_id, mutate } = props;

  const { data: embarcacao, isLoading } = useSWR<Embarcacao>(
    embarcacao_id ? `/api/embarcacao/read/byid?id=${embarcacao_id}` : null,
    fetcher
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='min-w-[1000px]'>
        <DialogHeader>
          <DialogTitle>Embarcação #{embarcacao_id}</DialogTitle>
          <DialogDescription asChild></DialogDescription>
        </DialogHeader>
        <div className='flex flex-wrap gap-2'>
          <div className='flex flex-col gap-1 rounded-xl border '>
            <div className='bg-blue-200 p-2 rounded-ss-xl rounded-se-xl text-sm'>
              Nome
            </div>
            <div className='p-2 text-xs'>{embarcacao?.nome}</div>
          </div>
          <div className='flex flex-col gap-1 rounded-xl border grow'>
            <div className='bg-blue-200 p-2 rounded-ss-xl rounded-se-xl text-sm'>
              Tipo
            </div>
            <div className='p-2 text-xs'>
              {embarcacao?.tipo_embarcacao.tipo}
            </div>
          </div>
          <div className='flex flex-col gap-1 rounded-xl border w-full'>
            <div className='bg-blue-200 p-2 rounded-ss-xl rounded-se-xl text-sm'>
              Observação
            </div>
            <div className='p-2 text-xs'>{embarcacao?.observacao}</div>
          </div>
          <Table>
            <TableHeader className='bg-blue-200 p-2 rounded-ss-xl rounded-se-xl text-sm'>
              <TableRow>
                <TableHead className=''>Pessoa</TableHead>
                <TableHead>Início</TableHead>
                <TableHead>Fim</TableHead>
                <TableHead>País</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {embarcacao?.relacao_embarcacao_proprietario.map((relacao) => (
                <TableRow>
                  <TableCell className='font-medium'>
                    {relacao.pessoa.nome} | {relacao.pessoa?.pais?.pais}
                  </TableCell>
                  <TableCell>
                    {dayjs(relacao.data_inicio).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    {dayjs(relacao.data_fim).format('DD/MM/YYYY')}
                  </TableCell>

                  <TableCell>{relacao.pais.pais}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            {embarcacao?.relacao_embarcacao_proprietario.length === 0 && (
              <TableCaption>Nenhum proprietário encontrado</TableCaption>
            )}
          </Table>
        </div>
        <AddOwner mutate={mutate} />
      </DialogContent>
    </Dialog>
  );
}
