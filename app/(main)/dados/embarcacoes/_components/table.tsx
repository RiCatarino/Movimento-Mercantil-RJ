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
import useSWR from "swr";
import fetcher from "@/lib/fetch";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { EditIcon, XIcon } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

import { Input } from "@/components/ui/input";
import PaginacaoByTotal from "@/components/sharedpaginationbytotal";

import { useSearchParams } from "next/navigation";

type EmbarcacoesAndTotal = {
  embarcacoes: Embarcacao[];
  total: number;
};

export default function TableEmbarcacoes() {
  const searchParams = useSearchParams();
  const name = searchParams.get("nome");
  const [open, setOpen] = useState(false);
  const [embarcacao, setEmbarcacao] = useState<Embarcacao>();
  const [activePage, setPage] = useState(1);
  const [searchText, setSearchText] = useState(name ?? "");

  const {
    data: data,
    isLoading,
    mutate,
  } = useSWR<EmbarcacoesAndTotal>(
    "/api/embarcacao/read/bynamepagination?nome=" +
      searchText +
      "&page=" +
      activePage,
    fetcher
  );

  return (
    <div className="flex flex-col p-2 mt-2 border-2 border-gray-300 dark:border-slate-900 border-solid shadow-lg  gap-2 rounded-3xl">
      <div className="flex flex-col-reverse justify-between md:flex-row gap-4 ">
        <Input
          id="search"
          value={searchText}
          className="rounded-xl"
          placeholder="Pesquisar por nome..."
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      {isLoading ? (
        <div className="flex flex-row justify-center p-4">
          <Loader classProp="w-24 h-24 self-center flex" />
        </div>
      ) : (
        <Table className="bg-white">
          <TableHeader className="p-2 border-t-0 bg-gradient-to-r from-blue-200 to-blue-400 dark:from-slate-700 dark:to-slate-950">
            <TableRow>
              <TableHead className="md:w-96">Nome</TableHead>
              <TableHead className="md:w-96">Tipo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.embarcacoes?.map((embarcacao) => (
              <TableRow
                className="cursor-pointer hover:bg-blue-100"
                key={embarcacao.id}
                onClick={(e) => {
                  setEmbarcacao(embarcacao);
                  setOpen(true);
                }}
              >
                <TableCell className="font-medium">{embarcacao.nome}</TableCell>
                <TableCell className="font-medium">
                  {embarcacao.tipo_embarcacao?.tipo}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {!isLoading && (
        <PaginacaoByTotal
          total={data?.total ? Math.ceil(data.total / 10) : 1}
          activePage={activePage}
          setPage={setPage}
        />
      )}{" "}
      <VesselDetails
        open={open}
        setOpen={setOpen}
        embarcacao_id={embarcacao?.id}
      />
    </div>
  );
}
