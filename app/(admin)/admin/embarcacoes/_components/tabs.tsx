'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TableEmbarcacoes from '../_components/embarcacoes/table';
import TableTipos from '../_components/tipos/table';
import { useSearchParams } from 'next/navigation';

export default function EmbarcacoesTabs() {
  const searchParams = useSearchParams();

  const tipo = searchParams.get('tipo');
  return (
    <Tabs
      defaultValue={tipo === 'tipos' ? 'tipos' : 'embarcacoes'}
      className='w-full'
    >
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
  );
}
