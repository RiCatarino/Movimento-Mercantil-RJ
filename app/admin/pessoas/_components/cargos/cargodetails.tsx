import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import fetcher from '@/lib/fetch';
import { Dispatch, SetStateAction } from 'react';
import useSWR from 'swr';
import Loader from '@/components/loader';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function CargoDetails(props: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  cargo_id: number | undefined;
}) {
  const { open, setOpen, cargo_id } = props;
  const { data: pessoas, isLoading } = useSWR<Pessoa[]>(
    cargo_id ? `/api/pessoa/read/bycargo?id=${cargo_id}` : null,
    fetcher
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='min-w-[50%] max-w-[95%] md:max-w-[50%] p-6 rounded-lg max-h-[95%] overflow-y-scroll'>
        <DialogHeader>
          <DialogTitle>Pessoas com este cargo</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <div className='flex items-center justify-center'>
            <Loader classProp='w-24 h-24' />
          </div>
        ) : (
          <Table>
            <TableHeader className='p-2 text-xs border-t-0 bg-gradient-to-r from-blue-200 to-blue-400 '>
              <TableRow className='rounded-ss-xl'>
                <TableHead>Nome</TableHead>
                <TableHead>País</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pessoas?.map((pessoa) => (
                <TableRow
                  className='cursor-pointer hover:bg-blue-100'
                  key={pessoa.id}
                >
                  <TableCell className='text-xs font-medium'>
                    {pessoa.nome}
                  </TableCell>
                  <TableCell className='text-xs font-medium'>
                    {pessoa.pais?.pais}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            {pessoas?.length === 0 && (
              <TableCaption className='p-4'>
                Nenhuma pessoa com este título
              </TableCaption>
            )}
          </Table>
        )}
      </DialogContent>
    </Dialog>
  );
}
