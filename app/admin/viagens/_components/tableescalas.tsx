import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import dayjs from 'dayjs';
import { useState } from 'react';
import { EscalasDrawer } from './mercadoriaescaladrawer';
import { XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Loader from '@/components/loader';

export default function TableEscalas(props: {
  escalas: Escala[] | undefined;
  mutate: () => void;
}) {
  const { escalas, mutate } = props;
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [relacmercadoriaescala, setRelacMercadoriaEscala] = useState<
    RelacMercadoriaEscala[] | undefined
  >();

  async function handleDeleteEscala(id: number) {
    setDeleting(true);
    await fetch(`/api/escala/delete`, {
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
        <TableHeader className='bg-blue-200 p-2 text-xs border-t-0 '>
          <TableRow className='rounded-ss-xl'>
            <TableHead>Data</TableHead>
            <TableHead>Ano</TableHead>
            <TableHead>Dias no Porto</TableHead>
            <TableHead>Porto</TableHead>
            <TableHead>Entraram</TableHead>
            <TableHead>Saíram</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {escalas?.map((escala) => (
            <TableRow
              className='cursor-pointer hover:bg-blue-100'
              key={escala.id}
              onClick={(e) => {
                setRelacMercadoriaEscala(escala.relac_mercadoria_escala);
                setOpen(true);
              }}
            >
              <TableCell className='font-medium text-xs'>
                {dayjs(escala.data_escala).format('DD-MM-YYYY')}
              </TableCell>
              <TableCell className='font-medium text-xs'>
                {escala.ano}
              </TableCell>
              <TableCell className='font-medium text-xs'>
                {escala.dias_porto}
              </TableCell>
              <TableCell className='font-medium text-xs'>
                {escala.porto.nome}
              </TableCell>
              <TableCell className='font-medium text-xs'>
                {escala.entrada_de_passageiros}
              </TableCell>
              <TableCell className='font-medium text-xs'>
                {escala.saida_de_passageiros}
              </TableCell>
              <TableCell className='w-4'>
                <Button
                  variant='link'
                  size='icon'
                  className='rounded-full'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteEscala(escala.id);
                  }}
                >
                  <XIcon className='w-4 text-red-600' />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <EscalasDrawer
        open={open}
        setOpen={setOpen}
        relac_mercadoria_escala={relacmercadoriaescala}
      />
    </>
  );
}
