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
    <main className='p-4 md:mx-24 '>
      <Tabs defaultValue='pessoas' className='w-full'>
        <TabsList className='rounded-3xl bg-blue-200 w-full'>
          <TabsTrigger value='pessoas' className='rounded-3xl w-1/2 '>
            Pessoas
          </TabsTrigger>
          <TabsTrigger value='titulos' className='rounded-3xl w-1/2'>
            Títulos de Nobreza
          </TabsTrigger>
          <TabsTrigger value='cargos' className='rounded-3xl w-1/2'>
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
