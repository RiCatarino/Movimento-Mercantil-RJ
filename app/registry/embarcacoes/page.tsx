"use client";
import fetcher from "@/lib/fetch";
import useSWR from "swr";
import { DataTable } from "./_components/table";
import Search from "./_components/search";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function EmbarcacoesPage() {
  const {
    data: embarcacoes,
    isLoading,
    mutate,
  } = useSWR<Embarcacao[]>("/api/embarcacao/read", fetcher);

  const { data: Embarcacao, isLoading: loading } = useSWR<Embarcacao[]>(
    "/api/embarcacao/read/byname",
    fetcher
  );

  return (
    <main className="min-h-full flex flex-col">
      <div className="min-h-full p-4 border-2 shadow-lg mt-24 gap-2 rounded-3xl md:mx-24">
        <div className="w-full min-h-full dark:bg-black md:h-screen md:mt-0">
          <Search>
            {/* <Select>
              <SelectContent className="overflow-visible ">
                {Embarcacao?.map((tipo) => (
                  <SelectItem key={tipo.id} value={tipo.id.toString()}>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>{tipo.nome}</TooltipTrigger>
                        <TooltipContent
                          side="right"
                          className="p-2 ml-10 overflow-y-auto rounded-lg max-w-96 max-h-96"
                        ></TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select> */}
          </Search>
          <DataTable
            embarcacoes={embarcacoes}
            isLoading={isLoading}
            mutate={mutate}
          />
        </div>
      </div>
    </main>
  );
}
