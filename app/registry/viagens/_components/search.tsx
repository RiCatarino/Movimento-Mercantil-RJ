"use cliente";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";

export default function Search() {
  return (
    <div className="flex items-center justify-left p-2 pb-3 sm:w-1/2 md:w-1/3">
      <Input type="search" placeholder="Pesquisa . . ." />
      <div>
        <Button className="text-white shadow-2xl transition-all duration-300 bg-blue-500 rounded-m hover:scale-105 hover:bg-blue-200 active:scale-95 ml-2">
          <SearchIcon />
        </Button>
      </div>
    </div>
  );
}
