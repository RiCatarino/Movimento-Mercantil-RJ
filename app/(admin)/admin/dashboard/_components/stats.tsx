'use client';

import { validateRequest } from '@/auth';
import StatsCard from './statscard';
import {
  GitCompareArrows,
  PersonStanding,
  Sailboat,
  Ship,
  Users,
} from 'lucide-react';
import useSWR from 'swr';
import fetcher from '@/lib/fetch';
// import { useRouter } from 'next/navigation';
interface AggregateCount {
  _count: {
    id: number;
  };
}

interface StatsProps {
  embarcacoes: AggregateCount;
  pessoas: AggregateCount;
  viagens: AggregateCount;
  tipo_embarcacao: AggregateCount;
  titulo_nobreza: AggregateCount;
  unidades_de_medida: AggregateCount;
  portos: AggregateCount;
  usuarios: AggregateCount;
}

export default function Stats() {
  const { data: stats } = useSWR<StatsProps>('/api/stats', fetcher);

  return (
    <div className='flex flex-wrap gap-2'>
      <StatsCard
        title='Viagens'
        value={stats?.viagens?._count.id || 0}
        icon={<GitCompareArrows />}
      />
      <StatsCard
        title='Embarcações'
        value={stats?.embarcacoes?._count.id || 0}
        icon={<Ship />}
      />
      <StatsCard
        title='Tipos de Embarcações'
        value={stats?.tipo_embarcacao?._count.id || 0}
        icon={<Ship />}
      />

      <StatsCard
        title='Usuários'
        value={stats?.usuarios?._count.id || 0}
        icon={<Users />}
      />
      <StatsCard
        title='Total de Pessoas'
        value={stats?.pessoas?._count.id || 0}
        icon={<PersonStanding />}
      />
      <StatsCard
        title='Títulos de Nobreza'
        value={stats?.titulo_nobreza?._count.id || 0}
        icon={<PersonStanding />}
      />
      <StatsCard
        title='Unidades de Medida'
        value={stats?.unidades_de_medida?._count.id || 0}
        icon={<PersonStanding />}
      />
    </div>
  );
}
