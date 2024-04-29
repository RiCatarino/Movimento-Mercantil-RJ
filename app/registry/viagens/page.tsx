import TripsTable from "./_components/table";

export default function EmbarcacoesPage() {
  return (
    <main className="flex flex-col p-4 border-2 border-none shadow-lg  gap-2 rounded-3xl md:mx-24">
      <div className="flex flex-col p-4 mt-28 border-2 border-gray-300 border-solid shadow-lg  gap-2 rounded-3xl md:mx-24">
        <div className="w-full dark:bg-black md:h-screen md:mt-0">
          <TripsTable />
        </div>
      </div>
    </main>
  );
}
