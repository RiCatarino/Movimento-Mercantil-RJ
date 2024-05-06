"use cliente";

import { Button } from "@/components/ui/button";
import { ChevronsUpDownIcon } from "lucide-react";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import dayjs from "dayjs";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
var customParseFormat = require("dayjs/plugin/customParseFormat");
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import fetcher from "@/lib/fetch";
import useSWR, { mutate } from "swr";
import { Search as SearchIcon } from "lucide-react";

const formSchema = z.object({
  nome_embarcacao: z.number().nullable(),
});

export default function SearchFilters({ onSearch }: { onSearch: any }) {
  const [selectEmbarcacao, setSelectEmbarcacao] = useState(false);
  const [searchEmbarcacaoName, setSearchEmbarcacaoName] = useState("");

  const handleSearch = () => {
    const selectedEmbarcacao = embarcacoes?.find(
      (embarcacoes) => embarcacoes.id === form.getValues().nome_embarcacao
    );
    onSearch(selectedEmbarcacao);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome_embarcacao: null,
    },
  });

  const { data: embarcacoes } = useSWR<Embarcacao[]>(
    searchEmbarcacaoName &&
      "/api/embarcacao/read/byname?nome=" + searchEmbarcacaoName,
    fetcher
  );

  return (
    <div className=" flex items-center p-2 pb-3 justify-left sm:w-1/2 md:w-1/3">
      <FormProvider {...form}>
        {/* PESQUISA POR NOME EMBARCAÇÃO */}
        <FormField
          control={form.control}
          name="nome_embarcacao"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full grow">
              <FormLabel> Pesquisa Nome Embarcação </FormLabel>
              <Popover
                modal
                open={selectEmbarcacao}
                onOpenChange={setSelectEmbarcacao}
              >
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? embarcacoes?.find(
                            (embarcacao) => embarcacao.id === field.value
                          )?.nome
                        : "Seleccionar Nome Embarcação"}
                      <ChevronsUpDownIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]">
                  <Command>
                    <CommandInput
                      onValueChange={(value) => {
                        setSearchEmbarcacaoName(value);
                      }}
                      placeholder="Procurar Nome embarcação..."
                    />
                    {field.value ? (
                      <CommandEmpty>Embarcação não encontrada</CommandEmpty>
                    ) : null}
                    <CommandGroup>
                      <CommandList>
                        {embarcacoes?.map((embarcacao) => {
                          return (
                            <CommandItem
                              value={embarcacao.nome}
                              key={embarcacao.id}
                              onSelect={() => {
                                form.setValue("nome_embarcacao", embarcacao.id);
                                setSelectEmbarcacao(false);
                              }}
                            >
                              {embarcacao.nome}
                            </CommandItem>
                          );
                        })}
                      </CommandList>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
      </FormProvider>
      <Button
        className="ml-2 mt-5 text-white bg-blue-500 shadow-2xl transition-all duration-300 rounded-m hover:scale-105 hover:bg-blue-200 active:scale-95"
        onClick={handleSearch}
      >
        <SearchIcon />
      </Button>
    </div>
  );
}
