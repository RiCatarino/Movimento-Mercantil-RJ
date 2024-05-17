"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import fetcher from "@/lib/fetch";
import dayjs from "dayjs";
import useSWR from "swr";
import TripDetails from "../tripdetails";
import { useState } from "react";
import Loader from "@/components/loader";
import Paginacao from "@/components/sharedpagination";
import chunk from "@/lib/chunk";
export default function TripsTable() {
  const [activePage, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [viagem_id, setViagemId] = useState<number | undefined>();
  const {
    data: viagensdata,
    isLoading,
    mutate,
  } = useSWR<Viagem[]>("/api/viagem/read", fetcher);

  const chunked = chunk(viagensdata ?? [], 10);
  const viagens = chunked[activePage - 1];

  if (isLoading) return <Loader classProp="w-24 h-24 self-center" />;
  return (
    <>
      <Table>
        <TableHeader className="p-2 text-xs border-t-0 bg-gradient-to-r from-blue-200 to-blue-400 ">
          <TableRow className="rounded-ss-xl">
            <TableHead>ID</TableHead>
            <TableHead>Data Rio</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Embarcação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {viagens?.map((viagem) => (
            <TableRow
              className="cursor-pointer hover:bg-blue-100"
              key={viagem.id}
              onClick={(e) => {
                setViagemId(viagem.id);
                setOpen(true);
              }}
            >
              <TableCell className="text-xs font-medium">{viagem.id}</TableCell>
              <TableCell className="text-xs font-medium">
                {viagem.data_rio
                  ? dayjs(viagem.data_rio).format("DD/MM/YYYY")
                  : "N/A"}
              </TableCell>
              <TableCell className="text-xs font-medium">
                {viagem.entrada_sahida}
              </TableCell>
              <TableCell className="text-xs font-medium">
                {viagem.embarcacao.nome}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Paginacao chunked={chunked} activePage={activePage} setPage={setPage} />
      <TripDetails
        open={open}
        setOpen={setOpen}
        viagem_id={viagem_id}
        mutate={mutate}
      />
    </>
  );
}
