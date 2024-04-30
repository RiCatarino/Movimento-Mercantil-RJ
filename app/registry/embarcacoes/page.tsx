"use client";
import fetcher from "@/lib/fetch";
import useSWR from "swr";
import { DataTable } from "./_components/table";
import Search from "./_components/search";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronsUpDownIcon } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider } from "react-hook-form";

export default function EmbarcacoesPage() {
  const [searchEmbarcacaoName, setSearchEmbarcacaoName] = useState("");

  const [selectEmbarcacao, setSelectEmbarcacao] = useState(false);

  const formSchema = z.object({
    data_viagem: z.string().nullable(),
    data_chegada: z.string().nullable(),
    data_rio: z.string().nullable(),
    dias_viagem: z.string(),
    tripulacao: z.string(),
    passageiros: z.string(),
    porto_origem: z.number().nullable(),
    dias_porto_origem: z.string(),
    porto_destino: z.number().nullable(),
    dias_porto_destino: z.string(),
    id_embarcacao: z.number().nullable(),
    id_comandante: z.number().nullable(),
    id_capitao: z.number().nullable(),
    id_armador: z.number().nullable(),
    id_mestre: z.number().nullable(),
    entrada_sahida: z.string().nullable(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      data_viagem: "",
      data_chegada: "",
      data_rio: "",
      dias_viagem: "",
      tripulacao: "",
      passageiros: "",
      porto_origem: null,
      dias_porto_origem: "",
      porto_destino: null,
      dias_porto_destino: "",
      id_embarcacao: null,
      id_comandante: null,
      id_capitao: null,
      id_armador: null,
      id_mestre: null,
      entrada_sahida: null,
    },
  });

  const { data: embarcacoes } = useSWR<Embarcacao[]>(
    searchEmbarcacaoName &&
      "/api/embarcacao/read/byname?nome=" + searchEmbarcacaoName,
    fetcher
  );

  // const {
  //   data: embarcacoes,
  //   isLoading,
  //   mutate,
  // } = useSWR<Embarcacao[]>("/api/embarcacao/read", fetcher);

  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: embarcacaoNome,
    isLoading,
    mutate,
  } = useSWR<Embarcacao[]>(
    searchQuery
      ? `/api/embarcacao/read/byname?nome=${searchQuery}`
      : "/api/embarcacao/read",
    fetcher
  );

  embarcacaoNome?.forEach((embarcacao) => {
    if (embarcacao?.nome.startsWith("A")) {
      console.log(embarcacao?.nome);
    }
  });

  return (
    <FormProvider {...form}>
      <main className="min-h-full flex flex-col">
        <div className="min-h-full p-4 border-2 shadow-lg mt-24 gap-2 rounded-3xl md:mx-24">
          <div className="w-full min-h-full dark:bg-black md:h-screen md:mt-0">
            AS EMBARCAÇÕES
            <Search
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              onSearch={() => {
                setSearchQuery(searchInput);
                mutate();
              }}
            ></Search>
            <div className="flex items-center justify-left p-2 pb-3 sm:w-1/2 md:w-1/3">
              <FormField
                control={form.control}
                name="id_embarcacao"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full grow">
                    <FormLabel>Embarcação</FormLabel>
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
                              : "Seleccionar Embarcação"}
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
                            placeholder="Procurar embarcação..."
                          />
                          {field.value ? (
                            <CommandEmpty>
                              Embarcação não encontrada
                            </CommandEmpty>
                          ) : null}
                          <CommandGroup>
                            <CommandList>
                              {embarcacoes?.map((embarcacao) => {
                                return (
                                  <CommandItem
                                    value={embarcacao.nome}
                                    key={embarcacao.id}
                                    onSelect={() => {
                                      form.setValue(
                                        "id_embarcacao",
                                        embarcacao.id
                                      );
                                      setSelectEmbarcacao(false);
                                    }}
                                  >
                                    {embarcacao.nome} |{" "}
                                    {embarcacao.tipo_embarcacao?.tipo}{" "}
                                    {embarcacao.pais
                                      ? " | " + embarcacao.pais?.pais
                                      : ""}
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
            </div>
            <DataTable
              embarcacoes={embarcacaoNome}
              isLoading={isLoading}
              mutate={mutate}
            />
          </div>
        </div>
      </main>
    </FormProvider>
  );
}
