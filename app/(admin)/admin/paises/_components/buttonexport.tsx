import { Button } from "@/components/ui/button";
import ExportPaisesToExcel from "../actions/exporttoexcel";
import { FileSpreadsheetIcon } from "lucide-react";

export default function BotaoExportarParaExcel(props: {
  paises: Pais[] | undefined;
}) {
  const { paises } = props;

  if (!paises) {
    return null;
  }
  return (
    <Button
      className="rounded-xl bg-green-500 hover:bg-green-700 "
      onClick={() => ExportPaisesToExcel(paises)}
    >
      <FileSpreadsheetIcon className="w-6 h-6 mr-2" />
      Exportar
    </Button>
  );
}
