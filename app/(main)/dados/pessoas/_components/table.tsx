"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import VesselDetails from './vesseldetails';
import { useState } from "react";
import PersonDetails from "./persondetails";
import fetcher from "@/lib/fetch";
import Loader from "@/components/loader";
import useSWR from "swr";

export default function PeopleTable() {
  const [open, setOpen] = useState(false);
  const [pessoa_id, setPessoaId] = useState<number | undefined>();
  const {
    data: pessoas,
    isLoading,
    mutate,
  } = useSWR<Pessoa[]>("/api/pessoa/read", fetcher);

  if (isLoading) return <Loader classProp="w-24 h-24 self-center" />;
  return (
    <div className="rounded-md">
      <Table>
        <TableHeader className="p-2 text-xs border-t-0 bg-gradient-to-r from-blue-200 to-blue-400 ">
          <TableRow className="rounded-ss-xl">
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Título Nobreza</TableHead>
            <TableHead>País</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pessoas?.map((pessoa) => (
            <TableRow
              className="cursor-pointer hover:bg-blue-100"
              key={pessoa.id}
              onClick={(e) => {
                e.stopPropagation();
                setPessoaId(pessoa.id);
                setOpen(true);
              }}
            >
              <TableCell className="text-xs font-medium">{pessoa.id}</TableCell>
              <TableCell className="text-xs font-medium">
                {pessoa.nome}
              </TableCell>
              <TableCell className="text-xs font-medium">
                {pessoa?.titulo_nobreza?.titulo}
              </TableCell>
              <TableCell className="text-xs font-medium">
                {pessoa.pais?.pais}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PersonDetails
        open={open}
        setOpen={setOpen}
        pessoa_id={pessoa_id}
        mutate={mutate}
      />
    </div>
  );
}
