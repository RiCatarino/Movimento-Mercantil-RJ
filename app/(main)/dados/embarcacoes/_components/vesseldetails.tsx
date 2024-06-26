import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import fetcher from "@/lib/fetch";
import { Dispatch, SetStateAction, useState } from "react";
import useSWR from "swr";

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
import Loader from "@/components/loader";
import { XIcon } from "lucide-react";
import Paginacao from "@/components/sharedpagination";
import chunk from "@/lib/chunk";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

dayjs.extend(utc);
dayjs.extend(tz);

export default function VesselDetails(props: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  embarcacao_id: number | undefined;
}) {
  const { open, setOpen, embarcacao_id } = props;
  const [activePagePessoas, setPagePessoas] = useState(1);
  const [activePageViagens, setPageViagens] = useState(1);

  const {
    data: embarcacao,
    isLoading,
    mutate: mutateEmbarcacao,
  } = useSWR<Embarcacao>(
    embarcacao_id ? `/api/embarcacao/read/byid?id=${embarcacao_id}` : null,
    fetcher
  );

  const chunkedpessoas = chunk(
    embarcacao?.relacao_embarcacao_proprietario ?? [],
    5
  );
  const pessoas = chunkedpessoas[activePagePessoas - 1];

  const chunkedviagens = chunk(embarcacao?.viagem ?? [], 5);
  const viagens = chunkedviagens[activePageViagens - 1];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className=" min-w-[50%] w-11/12 p-6 rounded-lg max-h-[95%] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader classProp="w-24 h-24" />
              </div>
            ) : (
              "Embarcação " + embarcacao?.nome
            )}
          </DialogTitle>
        </DialogHeader>
        {!isLoading && (
          <>
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col gap-1 rounded-xl border min-w-[50%]">
                <div className="p-2 text-sm bg-blue-200 dark:bg-slate-900 rounded-ss-xl rounded-se-xl">
                  Nome
                </div>
                <div className="p-2 text-xs">{embarcacao?.nome}</div>
              </div>
              <div className="flex flex-col border gap-1 rounded-xl grow">
                <div className="p-2 text-sm bg-blue-200 dark:bg-slate-900 rounded-ss-xl rounded-se-xl">
                  Tipo
                </div>
                <div className="p-2 text-xs">
                  {embarcacao?.tipo_embarcacao.tipo}
                </div>
              </div>
              <div className="flex flex-col border gap-1 rounded-xl grow">
                <div className="p-2 text-sm bg-blue-200 dark:bg-slate-900 rounded-ss-xl rounded-se-xl">
                  Descrição
                </div>
                <div className="p-2 text-xs">
                  {embarcacao?.tipo_embarcacao.texto_descritivo}
                </div>
              </div>
              {embarcacao?.tipo_embarcacao?.imagem_embarcacao &&
                embarcacao?.tipo_embarcacao?.imagem_embarcacao.length > 0 && (
                  <div className="flex flex-col p-2 gap-2">
                    <div className="flex flex-wrap gap-2">
                      {embarcacao?.tipo_embarcacao?.imagem_embarcacao?.map(
                        (img) => (
                          <img
                            key={img.id}
                            src={img.imagem}
                            alt={embarcacao?.tipo_embarcacao.tipo}
                            className="w-full border rounded-lg  max-h-64 md:max-w-96 md:w-auto"
                          />
                        )
                      )}
                    </div>
                  </div>
                )}
              <div className="flex flex-col w-full border gap-1 rounded-xl">
                <div className="p-2 text-sm bg-blue-200 dark:bg-slate-900 rounded-ss-xl rounded-se-xl">
                  Observação
                </div>
                <div className="p-2 text-xs">{embarcacao?.observacao}</div>
              </div>
              <Accordion
                type="single"
                collapsible
                className="flex flex-col flex-1 w-full"
              >
                <AccordionItem value="vessel" className="w-full">
                  <AccordionTrigger>Pessoas</AccordionTrigger>
                  <AccordionContent>
                    {/* <div className='flex-1 max-w-xs  md:max-w-full rounded-ss-xl rounded-se-xl'> */}
                    <Table>
                      <TableHeader className="p-2 text-xs bg-blue-200  dark:bg-slate-900">
                        <TableRow className="rounded-ss-xl">
                          <TableHead>Pessoa</TableHead>
                          <TableHead>Início</TableHead>
                          <TableHead>Fim</TableHead>
                          <TableHead>País</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pessoas?.map(
                          (relacao: RelacEmbarcacaoProprietario) => (
                            <TableRow key={relacao.id}>
                              <TableCell className="text-xs font-medium">
                                {relacao.pessoa.nome} |{" "}
                                {relacao.pessoa?.pais?.pais}
                              </TableCell>
                              <TableCell className="text-xs">
                                {dayjs
                                  .tz(relacao.data_inicio, "UTC")
                                  .format("DD/MM/YYYY")}
                              </TableCell>
                              <TableCell className="text-xs">
                                {dayjs
                                  .tz(relacao.data_fim, "UTC")
                                  .format("DD/MM/YYYY")}
                              </TableCell>

                              <TableCell className="text-xs">
                                {relacao.pais.pais}
                              </TableCell>
                            </TableRow>
                          )
                        )}
                      </TableBody>
                      {embarcacao?.relacao_embarcacao_proprietario.length ===
                        0 && (
                        <TableCaption>
                          Nenhum proprietário encontrado
                        </TableCaption>
                      )}
                    </Table>
                    <Paginacao
                      chunked={chunkedpessoas}
                      activePage={activePagePessoas}
                      setPage={setPagePessoas}
                    />
                    {/* </div> */}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="trip" className="w-full">
                  <AccordionTrigger>Viagens</AccordionTrigger>
                  <AccordionContent>
                    {/* VIAGENS */}
                    {/* <div className='flex-1 max-w-xs  md:max-w-full rounded-ss-xl rounded-se-xl'> */}
                    <Table>
                      <TableHeader className="p-2 text-xs bg-blue-200 dark:bg-slate-900 ">
                        <TableRow className="rounded-ss-xl">
                          <TableHead>Data rio</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Origem</TableHead>
                          <TableHead>Destino</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {viagens?.map((viagem) => (
                          <TableRow key={viagem.id}>
                            <TableCell className="text-xs">
                              {viagem.data_rio
                                ? dayjs
                                    .tz(viagem.data_rio, "UTC")
                                    .format("DD/MM/YYYY")
                                : "N/A"}
                            </TableCell>
                            <TableCell className="text-xs">
                              {viagem.entrada_sahida}
                            </TableCell>
                            <TableCell className="text-xs">
                              {viagem.porto_origem?.nome
                                ? viagem.porto_origem?.nome
                                : "N/A"}
                              {viagem.porto_origem?.pais?.pais
                                ? " | " + viagem.porto_origem?.pais?.pais
                                : ""}
                            </TableCell>
                            <TableCell className="text-xs">
                              {viagem.porto_destino?.nome
                                ? viagem.porto_destino?.nome
                                : "N/A"}
                              {viagem.porto_destino?.pais?.pais
                                ? " | " + viagem.porto_destino?.pais?.pais
                                : ""}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                      {embarcacao?.viagem.length === 0 && (
                        <TableCaption>
                          Nenhuma viagem encontrada para esta embarcação
                        </TableCaption>
                      )}
                    </Table>

                    <Paginacao
                      chunked={chunkedpessoas}
                      activePage={activePagePessoas}
                      setPage={setPagePessoas}
                    />
                    {/* </div> */}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
