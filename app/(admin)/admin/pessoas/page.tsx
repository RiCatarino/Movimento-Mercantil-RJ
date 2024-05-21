import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TabelaTitulos from './_components/titulos/table';
import TabelaCargos from './_components/cargos/table';
import TabelaPessoas from './_components/pessoas/table';
import { redirect } from 'next/navigation';
import { validateRequest } from '@/auth';

export default async function PessoasPage() {
  const { user } = await validateRequest();

  if (!user) {
    return redirect('/auth/signin');
  }
  return (
    <main className='p-1 md:p-4 lg:mx-24 '>
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
