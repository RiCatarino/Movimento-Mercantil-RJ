import TripsTable from "./_components/table";
import Search from "./_components/search";

export default function ViagensTable() {
  return (
    <main className="flex flex-col min-h-full">
      <div className="min-h-full p-4 mt-24 border-2 shadow-lg gap-2 rounded-3xl md:mx-24">
        <div className="w-full min-h-full dark:bg-black md:h-screen md:mt-0">
          <Search />
          <TripsTable />
        </div>
      </div>
    </main>
  );
}
