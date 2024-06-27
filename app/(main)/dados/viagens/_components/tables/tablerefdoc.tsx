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
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";
import { useState } from "react";
import chunk from "@/lib/chunk";
import Paginacao from "@/components/sharedpagination";

dayjs.extend(utc);
dayjs.extend(tz);

export default function TableRefDocumental(props: {
  viagem_id: number | undefined;
  refdocs: RelacViagemReferenciaDoc[] | undefined;
  mutate: () => void;
}) {
  const { refdocs, mutate, viagem_id } = props;
  const [activePage, setPage] = useState(1);
  const chunked = chunk(refdocs ?? [], 5);
  const refdocsdata = chunked[activePage - 1];

  return (
    <>
      <Table className="border-b">
        <TableHeader className="p-2 text-xs bg-blue-200 border-t-0 dark:bg-slate-900 ">
          <TableRow className="rounded-ss-xl">
            <TableHead>Data de Publicação</TableHead>
            <TableHead>Nome do Periódico</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {refdocsdata?.map((ref) => (
            <TableRow className="cursor-pointer hover:bg-blue-100" key={ref.id}>
              <TableCell className="text-xs font-medium">
                {dayjs.tz(ref.data_publicacao, "UTC").format("DD/MM/YYYY")}
              </TableCell>
              <TableCell className="text-xs font-medium">
                {ref.referencia_documental?.nome_periodico}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {refdocs?.length === 0 && (
          <TableCaption>Nenhuma referência documental encontrada</TableCaption>
        )}
      </Table>
      <Paginacao chunked={chunked} activePage={activePage} setPage={setPage} />
    </>
  );
}
