import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import StatsCard from "../components/registryDashboard";
import { GitCompareArrows, PersonStanding, Ship, Users } from "lucide-react";

export default function registryPage() {
  return (
    <main
      // style={{ backgroundColor: "green" }}
      className="min-h-full flex flex-col overflow-visible"
    >
      <div
        // style={{ backgroundColor: "red" }}
        className="min-h-full p-4 border-2 shadow-lg mt-24 gap-2 rounded-3xl md:mx-24"
      >
        <div
          // style={{ backgroundColor: "blue" }}
          className="w-full min-h-full dark:bg-black md:h-screen md:mt-0"
        >
          <h2 className="pl-5 pb-2 mt-3 text-xl font-bold text-left text-white md:text-4xl dark:text-white ">
            Informações Gerais
          </h2>

          <div
            // style={{ backgroundColor: "yellow" }}
            className="p-2 flex flex-wrap gap-2"
          >
            <StatsCard
              title="Viagens"
              value={10}
              description="Deixar aqui uma descrição do que há aqui.   - 10 viagens realizadas."
              icon={<GitCompareArrows className="w-20 h-20" />}
              href="/registry/viagens"
            />
            <StatsCard
              title="Embarcações"
              value={20}
              icon={<Ship className="w-20 h-20" />}
              description=""
              href="/registry/embarcacoes"
            />
            <StatsCard
              title="Pessoas"
              value={30}
              icon={<Users className="w-20 h-20" />}
              description=""
              href="/registry/pessoas"
            />
            <StatsCard
              title="Pneumoultramicroscopicossilicovulcanoconiótico"
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
      </div>
    </main>
  );
}
