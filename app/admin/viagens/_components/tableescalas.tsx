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

export default function TableEscalas(props: { escalas: Escala[] | undefined }) {
  const { escalas } = props;
  const [open, setOpen] = useState(false);
  const [relacmercadoriaescala, setRelacMercadoriaEscala] = useState<
    RelacMercadoriaEscala[] | undefined
  >();

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
          </TableRow>
        </TableHeader>
        <TableBody>
          {escalas?.map((escala) => (
            <TableRow
              className='cursor-pointer hover:bg-blue-100'
              key={escala.id}
              onClick={(e) => {
                e.stopPropagation();
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
