import { Button } from '@/components/ui/button';
import ExportCargosToExcel from './actions/exporttoexcel';
import { FileSpreadsheetIcon } from 'lucide-react';

export default function BotaoExportarParaExcel(props: {
  cargos: Cargo[] | undefined;
}) {
  const { cargos } = props;

  if (!cargos) {
    return null;
  }
  return (
    <Button
      className='rounded-xl bg-green-500 hover:bg-green-700 '
      onClick={() => ExportCargosToExcel(cargos)}
    >
      <FileSpreadsheetIcon className='w-6 h-6 mr-2' />
      Exportar
    </Button>
  );
}
