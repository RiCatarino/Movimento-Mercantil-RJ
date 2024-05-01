import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import InfoCard from "../components/registryDashboard";
import { GitCompareArrows, PersonStanding, Ship, Users } from "lucide-react";

export default function registryPage() {
  return (
    // <main
    //   // style={{ backgroundColor: "green" }}
    //   className="min-h-full flex flex-col overflow-visible"
    // >
    <div className="min-h-screen md:p-24 py-24 gap-2 flex flex-col">
      <div className="md:mx-auto w-12/12 grid sm:grid-cols-1 md:grid-cols-3 h-[70vh]">
        <div className="mb-10 m-2 shadow-lg bg-white relative">
          <div className="bg-white rounded-3xl overflow-hidden">
            <div className="rounded-xl z-50 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out cursor-pointer absolute from-primarypurple to-transparent bg-gradient-to-t inset-x-0 -bottom-2 pt-60 text-white flex items-end">
              <div className="w-full">
                <div className="p-4 space-y-3 text-xl group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 pb-10 transform transition duration-300 ease-in-out justify-end">
                  <div className="font-bold text-right uppercase">
                    <h1 className="z-10">TESTE</h1>
                  </div>
                </div>
              </div>
            </div>

            <img
              src="/Caravela.webp"
              className="w-full group-hover:scale-110 transition duration-300 ease-in-out object-bottom object-cover"
            ></img>
          </div>
        </div>
        <div className="each mb-10 m-2 shadow-lg bg-gray-100 relative">
          <Button className="h-full w-full selection:text-xl p-24 text-black shadow-2xl transition-all duration-500  bg-white rounded-xl  hover:scale-105 hover:bg-blue-200 active:scale-95">
            Embarcações
          </Button>
        </div>
        <div className="each mb-10 m-2 shadow-lg bg-gray-100 relative">
          <Button className="h-full  w-full text-xl p-24 text-black shadow-2xl transition-all duration-500  bg-white rounded-xl hover:scale-105 hover:bg-blue-200 active:scale-95">
            Pessoas
          </Button>
        </div>

        {/* <InfoCard
          title="Viagens"
          value={10}
          description="Deixar aqui uma descrição do que há aqui.   - 10 viagens realizadas."
          icon={<GitCompareArrows className="w-20 h-20" />}
          href="/registry/viagens"
        /> */}
        {/*
        <InfoCard
          title="Embarcações"
          value={20}
          icon={<Ship className="w-20 h-20" />}
          description=""
          href="/registry/embarcacoes"
        />
        <InfoCard
          title="Pessoas"
          value={30}
          icon={<Users className="w-20 h-20" />}
          description=""
          href="/registry/pessoas"
        />
        <InfoCard
          title="asdasd"
          value={40}
          icon={<PersonStanding className="w-20 h-20" />}
          description=""
          href="#"
        />
        <InfoCard
          title="Informação"
          value={123120}
          icon={<PersonStanding className="w-20 h-20" />}
          description=""
          href="#"
        />

        <InfoCard
          title="Informação"
          value={41}
          icon={<PersonStanding className="w-20 h-20" />}
          description=""
          href="#"
        />
        <InfoCard
          title="Informação"
          value={92}
          icon={<PersonStanding className="w-20 h-20" />}
          description=""
          href="#"
        /> */}
      </div>
    </div>
    // </main>
  );
}
