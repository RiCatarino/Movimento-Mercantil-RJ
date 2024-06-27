import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import fetcher from "@/lib/fetch";
import { Dispatch, SetStateAction, useState } from "react";
import useSWR, { KeyedMutator } from "swr";
import PersonRelacaoEmbarcacaoTable from "./personrelacembarcacaotable";
import Loader from "@/components/loader";
import { useToast } from "@/components/ui/use-toast";
import TabelaPessoaCargo from "./tablerelaccargo";

type PessoasAndTotal = {
  pessoas: Pessoa[];
  total: number;
};

export default function PersonDetails(props: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  pessoa_id: number | undefined;
  mutate: KeyedMutator<PessoasAndTotal>;
}) {
  const { open, setOpen, pessoa_id, mutate } = props;
  const { toast } = useToast();
  const {
    data: pessoa,
    isLoading,
    mutate: mutatePessoa,
  } = useSWR<Pessoa>(
    pessoa_id ? `/api/pessoa/read/byid?id=${pessoa_id}` : null,
    fetcher
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className=" min-w-[50%] w-11/12 p-6 rounded-lg max-h-[95%] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Pessoa</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader classProp="w-24 h-24" />
          </div>
        ) : (
          <>
            <div className="flex flex-wrap gap-2">
              <div className="flex w-full lg:w-auto flex-col gap-1 rounded-xl border min-w-[50%]">
                <div className="p-2 text-sm bg-blue-200 dark:bg-slate-900 rounded-ss-xl rounded-se-xl">
                  Nome
                </div>
                <div className="p-2 text-xs">{pessoa?.nome}</div>
              </div>

              <div className="flex flex-col border gap-1 rounded-xl grow">
                <div className="p-2 text-sm bg-blue-200 dark:bg-slate-900 rounded-ss-xl rounded-se-xl">
                  Título Nobreza
                </div>
                <div className="p-2 text-xs">
                  {pessoa?.titulo_nobreza?.titulo}
                </div>
              </div>
            </div>

            <div className="flex flex-col border gap-1 rounded-xl grow">
              <div className="p-2 text-sm bg-blue-200 dark:bg-slate-900 rounded-ss-xl rounded-se-xl">
                Mini biografia
              </div>
              <div className="p-2 text-xs">
                {pessoa?.minibiografia?.biografia}
              </div>
            </div>

            <div className="flex flex-col mt-4">
              <div className="flex gap-1 p-2 bg-blue-200 dark:bg-slate-900 justify-center mx-auto w-[50%] rounded-ss-xl rounded-se-xl text-sm">
                Cargos
              </div>
              <TabelaPessoaCargo pessoa={pessoa} mutatePessoa={mutatePessoa} />
            </div>

            <div className="flex flex-col mt-4 overflow-hidden">
              <div className="flex gap-1 p-2 bg-blue-200 dark:bg-slate-900 justify-center mx-auto w-[50%] rounded-ss-xl rounded-se-xl text-sm">
                Embarcações
              </div>
              <PersonRelacaoEmbarcacaoTable
                pessoa={pessoa}
                mutatePessoa={mutatePessoa}
              />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
