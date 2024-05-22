import TableEmbarcacoes from './_components/embarcacoes/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TableTipos from './_components/tipos/table';
import { validateRequest } from '@/auth';
import { redirect } from 'next/navigation';

export default async function EmbarcacoesPage() {
  const { user } = await validateRequest();

  if (!user) {
    return redirect('/auth/signin');
  }
  return (
    <main className='p-1 md:p-4 lg:mx-24 '>
      <title>Embarcações</title>
      <Tabs defaultValue='embarcacoes' className='w-full'>
        <TabsList className='w-full bg-blue-200 rounded-3xl'>
          <TabsTrigger value='embarcacoes' className='w-1/2 rounded-3xl '>
            Embarcações
          </TabsTrigger>
          <TabsTrigger value='tipos' className='w-1/2 rounded-3xl'>
            Tipos de Embarcações
          </TabsTrigger>
        </TabsList>
        <TabsContent value='embarcacoes'>
          <TableEmbarcacoes />
        </TabsContent>
        <TabsContent value='tipos'>
          <TableTipos />
        </TabsContent>
      </Tabs>
    </main>
  );
}
