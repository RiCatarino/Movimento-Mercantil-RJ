import TableEmbarcacoes from './_components/embarcacoes/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TableTipos from './_components/tipos/table';

export default function EmbarcacoesPage() {
  return (
    <main className='p-4 md:mx-24 '>
      <title>Embarcações</title>
      <Tabs defaultValue='embarcacoes' className='w-full'>
        <TabsList className='rounded-3xl bg-blue-200 w-full'>
          <TabsTrigger value='embarcacoes' className='rounded-3xl w-1/2 '>
            Embarcações
          </TabsTrigger>
          <TabsTrigger value='tipos' className='rounded-3xl w-1/2'>
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
