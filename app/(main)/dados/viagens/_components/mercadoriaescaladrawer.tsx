import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import fetcher from "@/lib/fetch";
import useSWR from "swr";
import chunk from "@/lib/chunk";
import Paginacao from "@/components/sharedpagination";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function MercadoriaEscalasDrawer(props: {
  open: boolean;
  setOpen: (open: boolean) => void;
  escala_id: number | undefined;
}) {
  const { open, setOpen, escala_id } = props;
  const [activePage, setPage] = useState(1);

  const { data: relac_mercadoria_escala, mutate } = useSWR<
    RelacMercadoriaEscala[]
  >(
    escala_id != undefined &&
      `/api/escala/read/mercadoria?id_escala=${escala_id}`,
    fetcher
  );

  const chunked = chunk(relac_mercadoria_escala ?? [], 5);
  const relac_mercadoria_escala_data = chunked[activePage - 1];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className=" min-w-[75%] w-11/12 p-6 rounded-lg max-h-[95%] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Mercadorias</DialogTitle>
          <DialogDescription>
            Aqui pode ver a lista de mercadorias associadas a esta escala.
          </DialogDescription>
        </DialogHeader>
        <Table>
          <TableHeader className="p-2 text-xs bg-blue-200 border-t-0 ">
            <TableRow className="rounded-ss-xl">
              <TableHead>Qt.</TableHead>
              <TableHead>Mercadoria</TableHead>
              <TableHead>Unid. Medida</TableHead>
              <TableHead>Frete</TableHead>
              <TableHead>Cosignatário</TableHead>
              <TableHead>Movimento</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {relac_mercadoria_escala_data?.map((mercadoria) => (
              <TableRow className="hover:bg-blue-100" key={mercadoria.id}>
                <TableCell className="text-xs font-medium">
                  {mercadoria.quantidade}
                </TableCell>
                <TableCell className="text-xs font-medium">
                  {mercadoria.mercadoria?.nome}
                </TableCell>
                <TableCell className="text-xs font-medium">
                  {mercadoria?.unidade_de_medida?.unidade_medida}
                </TableCell>
                <TableCell className="text-xs font-medium">
                  {/* format value as brazilian real */}
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(mercadoria.valor_frete)}
                </TableCell>
                <TableCell className="text-xs font-medium">
                  {mercadoria.cosignatario?.nome}
                </TableCell>
                <TableCell className="text-xs font-medium">
                  {mercadoria.movimento === "E"
                    ? "Entrada"
                    : mercadoria.movimento === "S"
                      ? "Saída"
                      : "N/A"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={1} className="text-xs font-bold">
                Total:{" "}
                {relac_mercadoria_escala_data?.reduce(
                  (acc, mercadoria) => acc + (mercadoria.quantidade || 0),
                  0
                ) || 0}
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>

              <TableCell colSpan={1} className="text-xs font-bold">
                Total:{" "}
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(
                  relac_mercadoria_escala?.reduce(
                    (acc, mercadoria) => acc + (mercadoria.valor_frete || 0),
                    0
                  ) || 0
                )}
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <Paginacao
          chunked={chunked}
          activePage={activePage}
          setPage={setPage}
        />
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
