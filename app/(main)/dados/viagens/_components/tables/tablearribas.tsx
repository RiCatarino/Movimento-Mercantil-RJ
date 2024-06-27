import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import chunk from "@/lib/chunk";
import Paginacao from "@/components/sharedpagination";

export default function TableArribas(props: {
  arribas: Arriba[] | undefined;
  mutate: () => void;
  viagem_id: number | undefined;
}) {
  const { arribas, mutate, viagem_id } = props;
  const [activePage, setPage] = useState(1);

  const chunked = chunk(arribas ?? [], 5);
  const arribasdata = chunked[activePage - 1];

  return (
    <>
      <Table className="border-b">
        <TableHeader className="p-2 text-xs bg-blue-200 border-t-0 dark:bg-slate-900 ">
          <TableRow className="rounded-ss-xl">
            <TableHead>Observações</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {arribasdata?.map((arriba) => (
            <TableRow
              className="cursor-pointer hover:bg-blue-100"
              key={arriba.id}
            >
              <TableCell className="text-xs font-medium">
                {arriba.observacoes}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        {arribas?.length === 0 && (
          <TableCaption>
            Não registámos qualquer arriba nesta viagem
          </TableCaption>
        )}
      </Table>
      <Paginacao chunked={chunked} activePage={activePage} setPage={setPage} />
    </>
  );
}
