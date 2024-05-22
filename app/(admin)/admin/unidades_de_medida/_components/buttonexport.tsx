import { Button } from '@/components/ui/button';
import ExportUnidadesToExcel from '../actions/exporttoexcel';
import { FileSpreadsheetIcon } from 'lucide-react';

export default function BotaoExportarParaExcel(props: {
  unidades: UnidadeDeMedida[] | undefined;
}) {
  const { unidades } = props;

  if (!unidades) {
    return null;
  }
  return (
    <Button
      className='rounded-xl bg-green-500 hover:bg-green-700 '
      onClick={() => ExportUnidadesToExcel(unidades)}
    >
      <FileSpreadsheetIcon className='w-6 h-6 mr-2' />
      Exportar
    </Button>
  );
}
