import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import dayjs from 'dayjs';

export default function TableMercadorias(props: {
  mercadorias: RelacMercadoriaViagem[] | undefined;
}) {
  const { mercadorias } = props;

  console.log(mercadorias);

  return (
    <Table>
      <TableHeader className='bg-blue-200 p-2 text-xs border-t-0 '>
        <TableRow className='rounded-ss-xl'>
          <TableHead>Qt.</TableHead>
          <TableHead>Mercadoria</TableHead>
          <TableHead>Unid. Medida</TableHead>
          <TableHead>Frete</TableHead>
          <TableHead>Cosignatário</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mercadorias?.map((mercadoria) => (
          <TableRow
            className='cursor-pointer hover:bg-blue-100'
            key={mercadoria.id}
          >
            <TableCell className='font-medium text-xs'>
              {mercadoria.quantidade_origem}
            </TableCell>
            <TableCell className='font-medium text-xs'>
              {mercadoria.mercadoria?.nome}
            </TableCell>
            <TableCell className='font-medium text-xs'>
              {mercadoria?.unidade_de_medida?.unidade_medida}
            </TableCell>
            <TableCell className='font-medium text-xs'>
              {/* format value as brazilian real */}
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(mercadoria.valor_frete)}
            </TableCell>
            <TableCell className='font-medium text-xs'>
              {mercadoria.cosignatario.nome}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={1} className='font-bold text-xs'>
            Total:{' '}
            {mercadorias?.reduce(
              (acc, mercadoria) => acc + (mercadoria.quantidade_origem || 0),
              0
            ) || 0}
          </TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>

          <TableCell colSpan={1} className='font-bold text-xs'>
            Total:{' '}
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(
              mercadorias?.reduce(
                (acc, mercadoria) => acc + (mercadoria.valor_frete || 0),
                0
              ) || 0
            )}
          </TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
