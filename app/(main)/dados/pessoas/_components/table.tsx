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

import PaginacaoByTotal from "@/components/sharedpaginationbytotal";
import { Input } from "@/components/ui/input";

import { useSearchParams } from "next/navigation";

type PessoasAndTotal = {
  pessoas: Pessoa[];
  total: number;
};

export default function TabelaPessoas() {
  const searchParams = useSearchParams();
  const name = searchParams.get("nome");
  const [activePage, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState<string>(name ?? "");
  const [pessoa, setPessoa] = useState<Pessoa>();
  const {
    data: data,
    isLoading,
    mutate,
  } = useSWR<PessoasAndTotal>(
    "/api/pessoa/read/bynamepagination?nome=" +
      searchText +
      "&page=" +
      activePage,
    fetcher
  );

  return (
    <div className="flex flex-col p-2 mt-2 border-2 border-gray-300 dark:border-slate-900 border-solid shadow-lg  gap-2 rounded-3xl">
      <div className="flex flex-col-reverse justify-between md:flex-row gap-4 ">
        <Input
          name="search"
          placeholder="Pesquisar por nome..."
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          className="rounded-xl"
        />
      </div>
      {isLoading ? (
        <main className="flex flex-row justify-center p-4">
          <Loader classProp="w-24 h-24 self-center flex" />
        </main>
      ) : (
        <div className="flex flex-col gap-4">
          <Table className="bg-white">
            <TableHeader className="p-2 border-t-0 bg-gradient-to-r from-blue-200 to-blue-400 dark:from-slate-700 dark:to-slate-950">
              <TableRow className="rounded-ss-xl">
                <TableHead className="w-96">Nome</TableHead>
                <TableHead className="hidden md:table-cell">Título</TableHead>
                <TableHead>País</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.pessoas?.map((pessoa) => (
                <TableRow
                  className="cursor-pointer hover:bg-blue-100"
                  key={pessoa.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setPessoa(pessoa);
                    setOpen(true);
                  }}
                >
                  <TableCell className="font-medium">{pessoa.nome}</TableCell>
                  <TableCell className="font-medium hidden md:table-cell">
                    {pessoa?.titulo_nobreza?.titulo}
                  </TableCell>
                  <TableCell className="font-medium">
                    {pessoa.pais?.pais}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {!isLoading && (
            <PaginacaoByTotal
              total={data?.total ? Math.ceil(data.total / 10) : 1}
              activePage={activePage}
              setPage={setPage}
            />
          )}
          <PersonDetails
            open={open}
            setOpen={setOpen}
            pessoa_id={pessoa?.id}
            mutate={mutate}
          />
        </div>
      )}
    </div>
  );
}
