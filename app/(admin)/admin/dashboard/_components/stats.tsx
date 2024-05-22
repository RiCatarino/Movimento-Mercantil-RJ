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
import Loader from '@/components/loader';
// import { useRouter } from 'next/navigation';
interface AggregateCount {
  _count: {
    id: number;
  };
}

interface withMost {
  count: number;
  name: string;
  id: number;
  pais: string;
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
  embarcacaoWithMostViagens: withMost;
  mestreWithMostViagens: withMost;
  armadorWithMostViagens: withMost;
  comandanteWithMostViagens: withMost;
  portoWithMostEscalas: withMost;
  viagemWithMostPassageiros: withMost;
}

export default function Stats() {
  const { data: stats, isLoading } = useSWR<StatsProps>('/api/stats', fetcher);

  return (
    <>
      {isLoading ? (
        <div className='z-10 flex items-center justify-center text-center  w-full h-screen bg-white bg-opacity-70 align-middle'>
          <div className='flex flex-col gap-4 items-center justify-center'>
            <Loader classProp='w-48 h-48' />
            <h1 className='text-2xl font-bold'>A carregar os dados ...</h1>
          </div>
        </div>
      ) : (
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
          <StatsCard
            title='Embarcações com mais viagens'
            value={stats?.embarcacaoWithMostViagens?.name || 'N/A'}
            icon={<Ship />}
          />
          <StatsCard
            title='Mestre com mais viagens'
            value={stats?.mestreWithMostViagens?.name || 'N/A'}
            icon={<PersonStanding />}
          />
          <StatsCard
            title='Armador com mais viagens'
            value={stats?.armadorWithMostViagens?.name || 'N/A'}
            icon={<PersonStanding />}
          />
          <StatsCard
            title='Comandante com mais viagens'
            value={stats?.comandanteWithMostViagens?.name || 'N/A'}
            icon={<PersonStanding />}
          />
          <StatsCard
            title='Porto com mais escalas'
            value={
              stats?.portoWithMostEscalas?.name +
                ' | ' +
                stats?.portoWithMostEscalas?.pais || 'N/A'
            }
            icon={<PersonStanding />}
          />
          <StatsCard
            title='Viagem com mais passageiros'
            value={
              (stats?.viagemWithMostPassageiros?.count +
                ' | ID: ' +
                stats?.viagemWithMostPassageiros?.id !=
                'undefined' &&
                stats?.viagemWithMostPassageiros?.id) ||
              'N/A'
            }
            icon={<GitCompareArrows />}
          />
        </div>
      )}
    </>
  );
}
