import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import StatsCard from "../components/registryDashboard";
import { GitCompareArrows, PersonStanding, Ship, Users } from "lucide-react";

export default function registryPage() {
  return (
    <main className="flex max-h-screen bg-blue-100">
      <div className="w-full dark:bg-black md:h-screen md:mt-0 mt-52">
        <div className="mt-20">
          <h2 className="pl-5 pb-2 pt-5 text-xl font-bold text-left text-blue-500 md:text-4xl dark:text-white ">
            Informações Gerais
          </h2>
        </div>

        <div className="p-3 flex flex-wrap gap-2">
          <StatsCard
            title="Total de viagens (mudar isto ?)"
            value={10}
            description="Deixar aqui uma descrição do que há aqui.   - 10 viagens realizadas."
            icon={<GitCompareArrows className="w-20 h-20" />}
            href="/registry/viagens"
          />
          <StatsCard
            title="Total de Embarcações"
            value={20}
            icon={<Ship className="w-20 h-20" />}
            description=""
            href="#"
          />
          <StatsCard
            title="Total de Usuários (mudar isto obviously)"
            value={30}
            icon={<Users className="w-20 h-20" />}
            description=""
            href="#"
          />
          <StatsCard
            title="Total de Pessoas"
            value={40}
            icon={<PersonStanding className="w-20 h-20" />}
            description=""
            href="#"
          />
          <StatsCard
            title="Informação"
            value={123120}
            icon={<PersonStanding className="w-20 h-20" />}
            description=""
            href="#"
          />

          <StatsCard
            title="Informação"
            value={41}
            icon={<PersonStanding className="w-20 h-20" />}
            description=""
            href="#"
          />
          <StatsCard
            title="Informação"
            value={92}
            icon={<PersonStanding className="w-20 h-20" />}
            description=""
            href="#"
          />
        </div>
      </div>
    </main>
  );
}
