"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import VesselDetails from "./vesseldetails";
import { useState } from "react";
import Loader from "@/components/loader";

export default function DataTable(props: {
  embarcacoes: Embarcacao[] | undefined;
  isLoading: boolean;
  mutate: () => void;
}) {
  const { embarcacoes, isLoading, mutate } = props;
  const [open, setOpen] = useState(false);
  const [embarcacao_id, setEmbarcacaoId] = useState<number | undefined>();

  if (isLoading) return <Loader classProp="w-24 h-24 self-center" />;

  return (
    <>
      <Table className="bg-white border-b-[1px]">
        <TableHeader className="p-2 text-xs border-t-0 bg-gradient-to-r from-blue-200 to-blue-400 ">
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Tipo de Embarcação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {embarcacoes?.map((embarcacao) => (
            <TableRow
              className="cursor-pointer hover:bg-blue-100"
              key={embarcacao.id}
              onClick={(e) => {
                e.stopPropagation();
                setEmbarcacaoId(embarcacao.id);
                setOpen(true);
              }}
            >
              <TableCell className="font-medium">{embarcacao.nome}</TableCell>
              <TableCell className="font-medium">
                {embarcacao.tipo_embarcacao.tipo}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <VesselDetails
        open={open}
        setOpen={setOpen}
        embarcacao_id={embarcacao_id}
      />
    </>
  );
}
