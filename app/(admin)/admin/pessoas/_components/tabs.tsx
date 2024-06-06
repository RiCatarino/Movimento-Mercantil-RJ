"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabelaTitulos from "../_components/titulos/table";
import TabelaCargos from "../_components/cargos/table";
import TabelaPessoas from "../_components/pessoas/table";
import { useSearchParams } from "next/navigation";

export default function PessoasTabs() {
  const searchParams = useSearchParams();
  const tipo = searchParams.get("tipo");
  return (
    <Tabs
      defaultValue={
        tipo === "titulos"
          ? "titulos"
          : tipo === "cargos"
            ? "cargos"
            : "pessoas"
      }
      className="w-full"
    >
      <TabsList className="w-full bg-blue-200 rounded-3xl">
        <TabsTrigger value="pessoas" className="w-1/2 rounded-3xl ">
          Pessoas
        </TabsTrigger>
        <TabsTrigger value="titulos" className="w-1/2 rounded-3xl">
          Títulos de Nobreza
        </TabsTrigger>
        <TabsTrigger value="cargos" className="w-1/2 rounded-3xl">
          Cargos
        </TabsTrigger>
      </TabsList>
      <TabsContent value="pessoas">
        <TabelaPessoas />
      </TabsContent>
      <TabsContent value="titulos">
        <TabelaTitulos />
      </TabsContent>
      <TabsContent value="cargos">
        <TabelaCargos />
      </TabsContent>
    </Tabs>
  );
}
