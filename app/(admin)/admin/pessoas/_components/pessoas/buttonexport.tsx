import { Button } from "@/components/ui/button";
import ExportPessoasToExcel from "./actions/exporttoexcel";
import { FileSpreadsheetIcon } from "lucide-react";

export default function BotaoExportarParaExcel(props: {
  pessoas: Pessoa[] | undefined;
}) {
  const { pessoas } = props;

  if (!pessoas) {
    return null;
  }
  return (
    <Button
      className="rounded-xl bg-green-500 hover:bg-green-700 "
      onClick={() => ExportPessoasToExcel(pessoas)}
    >
      <FileSpreadsheetIcon className="w-6 h-6 mr-2" />
      Exportar
    </Button>
  );
}
