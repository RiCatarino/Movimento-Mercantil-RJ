import { Button } from '@/components/ui/button';
import ExportViagensToExcel from '../actions/exporttoexcel';
import { FileSpreadsheetIcon } from 'lucide-react';

export default function BotaoExportarParaExcel(props: {
  viagens: Viagem[] | undefined;
}) {
  const { viagens } = props;

  if (!viagens) {
    return null;
  }
  return (
    <Button
      className='rounded-xl bg-green-500 hover:bg-green-700 '
      onClick={() => ExportViagensToExcel(viagens)}
    >
      <FileSpreadsheetIcon className='w-6 h-6 mr-2' />
      Exportar
    </Button>
  );
}
