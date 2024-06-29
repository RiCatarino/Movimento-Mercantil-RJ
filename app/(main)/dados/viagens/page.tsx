import TripsTable from './_components/tables/table';

export default function ViagensTable() {
  return (
    <main className='flex flex-col min-h-full'>
      <div className='min-h-full p-4 mt-6 shadow-sm gap-0 rounded-xl bg-white md:mx-24'>
        <div className='w-full min-h-full dark:bg-black md:h-screen md:mt-0'>
          <TripsTable />
        </div>
      </div>
    </main>
  );
}
