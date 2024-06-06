import { Button } from "@/components/ui/button";
import { FileSpreadsheetIcon } from "lucide-react";
import ExportEmbarcacoesToExcel from "./actions/exporttoexcel";

export default function BotaoExportarParaExcel(props: {
  embarcacoes: Embarcacao[] | undefined;
}) {
  const { embarcacoes } = props;

  if (!embarcacoes) {
    return null;
  }
  return (
    <Button
      className="rounded-xl bg-green-500 hover:bg-green-700 "
      onClick={() => ExportEmbarcacoesToExcel(embarcacoes)}
    >
      <FileSpreadsheetIcon className="w-6 h-6 mr-2" />
      Exportar
    </Button>
  );
}
