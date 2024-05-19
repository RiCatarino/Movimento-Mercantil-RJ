import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TabelaTitulos from './_components/titulos/table';
import TabelaCargos from './_components/cargos/table';
import TabelaPessoas from './_components/pessoas/table';

export default function PessoasPage() {
  return (
    // <main className='flex flex-col p-4 mx-0 mt-5 border-2 border-gray-300 border-solid shadow-lg gap-2 rounded-3xl md:mx-24 '>
    //   <NewPerson />
    //   <PeopleTable />
    // </main>
    <main className='p-4 lg:mx-24 '>
      <Tabs defaultValue='pessoas' className='w-full'>
        <TabsList className='w-full bg-blue-200 rounded-3xl'>
          <TabsTrigger value='pessoas' className='w-1/2 rounded-3xl '>
            Pessoas
          </TabsTrigger>
          <TabsTrigger value='titulos' className='w-1/2 rounded-3xl'>
            Títulos de Nobreza
          </TabsTrigger>
          <TabsTrigger value='cargos' className='w-1/2 rounded-3xl'>
            Cargos
          </TabsTrigger>
        </TabsList>
        <TabsContent value='pessoas'>
          <TabelaPessoas />
        </TabsContent>
        <TabsContent value='titulos'>
          <TabelaTitulos />
        </TabsContent>
        <TabsContent value='cargos'>
          <TabelaCargos />
        </TabsContent>
      </Tabs>
    </main>
  );
}
