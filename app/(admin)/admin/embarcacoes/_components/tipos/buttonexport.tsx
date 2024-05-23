import { Button } from '@/components/ui/button';
import { FileSpreadsheetIcon } from 'lucide-react';
import ExportTiposToExcel from './actions/exporttoexcel';

export default function BotaoExportarParaExcel(props: {
  tipos: TipoEmbarcacao[] | undefined;
}) {
  const { tipos } = props;

  if (!tipos) {
    return null;
  }
  return (
    <Button
      className='rounded-xl bg-green-500 hover:bg-green-700 '
      onClick={() => ExportTiposToExcel(tipos)}
    >
      <FileSpreadsheetIcon className='w-6 h-6 mr-2' />
      Exportar
    </Button>
  );
}
