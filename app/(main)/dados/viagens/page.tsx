import TripsTable from "./_components/tables/table";

export default function ViagensTable() {
  return (
    <main className="flex flex-col min-h-full">
      <div className="border-2 min-h-full p-4 mt-6 gap-0 rounded-xl bg-white md:mx-24 dark:bg-slate-700 ">
        <div className="w-full min-h-full dark:bg-slate-700 md:h-screen md:mt-0">
          <TripsTable />
        </div>
      </div>
    </main>
  );
}
