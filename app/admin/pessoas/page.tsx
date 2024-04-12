"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import fetcher from "@/lib/fetch";
import { ColumnDef } from "@tanstack/react-table";
import useSWR, { mutate } from "swr";
import { DataTable } from "../pessoas/_components/table";
import NewSomething from "./_components/buttonnew";

export const columns: ColumnDef<Pessoa>[] = [
  {
    accessorKey: "nome",
    header: "Nome",
  },
  {
    accessorKey: "titulo_nobreza.titulo",
    header: "Título Nobreza",
  },
  {
    accessorKey: "pais.pais",
    header: "País",
  },
];

export default function PessoasPage() {
  const { data: pessoas, isLoading } = useSWR<Pessoa[]>(
    "/api/pessoa/read",
    fetcher
  );

  return (
    <main className="flex p-4 border-gray-300 border-solid border-2 rounded-3xl mx-10 md:mx-24 mt-5 shadow-lg ">
      <div className="flex flex-col w-full">
        <NewSomething mutate={mutate} />
        <DataTable
          columns={columns}
          data={pessoas || []}
          isLoading={isLoading}
          mutate={mutate}
        />
      </div>
    </main>
  );
}
