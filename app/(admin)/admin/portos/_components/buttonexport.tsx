import { Button } from "@/components/ui/button";
import ExportPortosToExcel from "../actions/exporttoexcel";
import { FileSpreadsheetIcon } from "lucide-react";

export default function BotaoExportarParaExcel(props: {
  portos: Porto[] | undefined;
}) {
  const { portos } = props;

  if (!portos) {
    return null;
  }
  return (
    <Button
      className="rounded-xl bg-green-500 hover:bg-green-700 "
      onClick={() => ExportPortosToExcel(portos)}
    >
      <FileSpreadsheetIcon className="w-6 h-6 mr-2" />
      Exportar
    </Button>
  );
}
