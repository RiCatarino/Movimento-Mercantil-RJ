import BotaoNovaViagem from './_components/buttons/botaonovaviagem';
import TripsTable from './_components/tables/table';

export default function EmbarcacoesPage() {
  return (
    <main className='flex flex-col p-4 mt-5 border-2 border-gray-300 border-solid shadow-lg  gap-2 rounded-3xl md:mx-24'>
      <BotaoNovaViagem />
      <TripsTable />
    </main>
  );
}
