import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import dayjs from "dayjs";

export default function PersonRelacaoEmbarcacaoTable(props: {
  pessoa: Pessoa | undefined;
  mutatePessoa: () => void;
}) {
  const { pessoa, mutatePessoa } = props;

  return (
    <div className="flex-1 max-w-xs  md:max-w-full rounded-ss-xl rounded-se-xl">
      <Table className="shadow-xl">
        <TableHeader className="p-2 text-xs bg-blue-200 border-t-0 ">
          <TableRow className="rounded-ss-xl">
            <TableHead>ID</TableHead>
            <TableHead>Embarcação</TableHead>
            <TableHead>Início</TableHead>
            <TableHead>Fim</TableHead>
            <TableHead>País</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pessoa?.relacao_embarcacao_proprietario?.map((relacao) => (
            <TableRow key={relacao.id}>
              <TableCell className="px-4 py-0 text-xs font-medium">
                {relacao.embarcacao.id}
              </TableCell>
              <TableCell className="px-4 py-0 text-xs">
                {relacao.embarcacao.nome}
              </TableCell>
              <TableCell className="px-4 py-0 text-xs">
                {dayjs(relacao.data_inicio).format("DD/MM/YYYY")}
              </TableCell>
              <TableCell className="px-4 py-0 text-xs">
                {dayjs(relacao.data_fim).format("DD/MM/YYYY")}
              </TableCell>

              <TableCell className="px-4 py-0 text-xs">
                {relacao.pais.pais}
              </TableCell>
              <TableCell className="px-4 py-0 text-xs"></TableCell>
            </TableRow>
          ))}
        </TableBody>
        {pessoa?.relacao_embarcacao_proprietario?.length === 0 && (
          <TableCaption className="p-4">
            Nenhum proprietário encontrado
          </TableCaption>
        )}
      </Table>
    </div>
  );
}
