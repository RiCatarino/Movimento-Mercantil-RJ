import { Button } from '@/components/ui/button';
import ExportTitulosToExcel from './actions/exporttoexcel';
import { FileSpreadsheetIcon } from 'lucide-react';

export default function BotaoExportarParaExcel(props: {
  titulos: TituloNobreza[] | undefined;
}) {
  const { titulos } = props;

  if (!titulos) {
    return null;
  }
  return (
    <Button
      className='rounded-xl bg-green-500 hover:bg-green-700 '
      onClick={() => ExportTitulosToExcel(titulos)}
    >
      <FileSpreadsheetIcon className='w-6 h-6 mr-2' />
      Exportar
    </Button>
  );
}
