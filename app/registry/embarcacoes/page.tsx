'use client';
import fetcher from '@/lib/fetch';
import useSWR from 'swr';
import Search from './_components/search';
import React, { useState } from 'react';

import EmbarcacaoCard from './_components/card';

export default function EmbarcacoesPage() {
  const [searchEmbarcacaoName, setSearchEmbarcacaoName] = useState('');

  const { data: embarcacoes } = useSWR<Embarcacao[]>(
    '/api/embarcacao/read',
    fetcher
  );

  console.log(embarcacoes);

  // const {
  //   data: embarcacoes,
  //   isLoading,
  //   mutate,
  // } = useSWR<Embarcacao[]>("/api/embarcacao/read", fetcher);

  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // const {
  //   data: embarcacaoNome,
  //   isLoading,
  //   mutate,
  // } = useSWR<Embarcacao[]>(
  //   searchQuery
  //     ? `/api/embarcacao/read/byname?nome=${searchQuery}`
  //     : '/api/embarcacao/read',
  //   fetcher
  // );

  return (
    <main className='flex flex-col pt-24 md:px-24 px-4 '>
      <div className='w-full min-h-full dark:bg-black md:h-screen md:mt-0'>
        <Search
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          onSearch={() => {
            setSearchQuery(searchInput);
            // mutate();
          }}
        ></Search>
        {/* <div className="flex items-center p-2 pb-3 justify-left sm:w-1/2 md:w-1/3">
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
            </div> */}
        {/* <DataTable
            embarcacoes={embarcacaoNome}
            isLoading={isLoading}
            mutate={mutate}
          /> */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 mb-10 lg:mb-0 '>
          {embarcacoes?.map((embarcacao) => (
            <EmbarcacaoCard
              key={embarcacao.id}
              image={undefined}
              tipo={embarcacao.tipo_embarcacao.tipo}
              nome={embarcacao.nome}
              descricao={embarcacao.tipo_embarcacao.texto_descritivo}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
