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
import { Button } from "@/components/ui/button";
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

import { useState } from "react";
import fetcher from "@/lib/fetch";
import { XIcon } from "lucide-react";
import BotaoNovoCargo from "./buttonnewcargo";
import chunk from "@/lib/chunk";
import Paginacao from "@/components/sharedpagination";

dayjs.extend(utc);
dayjs.extend(tz);

var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

export default function TabelaPessoaCargo(props: {
  pessoa: Pessoa | undefined;
  mutatePessoa: () => void;
}) {
  const { pessoa, mutatePessoa } = props;
  const [deleting, setDeleting] = useState(false);
  const [activePage, setPage] = useState(1);

  const chunked = chunk(pessoa?.relacao_pessoa_cargo ?? [], 5);
  const pessoadata = chunked[activePage - 1];

  async function handleDeleteCargo(id: number) {
    setDeleting(true);
    await fetcher(`/api/pessoa/delete/cargo`, {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    mutatePessoa();
    setDeleting(false);
  }

  return (
    <div className="flex flex-col md:max-w-full rounded-ss-xl rounded-se-xl gap-4">
      <Table className="shadow-xl">
        <TableHeader className="p-2 text-xs bg-blue-200 border-t-0 dark:bg-slate-900  ">
          <TableRow className="rounded-ss-xl">
            <TableHead>Cargo</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Ano</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pessoadata?.map((relacao) => (
            <TableRow key={relacao.id}>
              <TableCell className="px-4 py-0 text-xs font-medium">
                {relacao.cargo?.cargo}
              </TableCell>
              <TableCell className="px-4 py-0 text-xs">
                {relacao.data_cargo
                  ? dayjs.tz(relacao.data_cargo, "UTC").format("DD/MM/YYYY")
                  : "N/A"}
              </TableCell>
              <TableCell className="px-4 py-0 text-xs">
                {relacao.ano || "N/A"}
              </TableCell>
              <TableCell className="w-10 px-4 py-0 text-xs">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="icon"
                      variant="link"
                      className="text-xs text-blue-500"
                    >
                      <XIcon className="w-4 text-red-700" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Tem a certeza?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Esta ação irá remover o
                        cargo da pessoa.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-500 hover:bg-red-600"
                        disabled={deleting}
                        onClick={() => handleDeleteCargo(relacao.id)}
                      >
                        {deleting ? "Aguarde..." : "Remover"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {pessoa?.relacao_pessoa_cargo?.length === 0 && (
          <TableCaption className="p-4">
            Nenhum registo de cargo encontrado
          </TableCaption>
        )}
      </Table>
      <Paginacao chunked={chunked} activePage={activePage} setPage={setPage} />
      {pessoa && <BotaoNovoCargo pessoa_id={pessoa.id} mutate={mutatePessoa} />}
    </div>
  );
}
