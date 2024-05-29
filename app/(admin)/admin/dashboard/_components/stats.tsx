'use client';

import StatsCard from './statscard';
import {
  AnchorIcon,
  CrownIcon,
  GitCompareArrows,
  PersonStanding,
  Ship,
  TagIcon,
  Users,
  WeightIcon,
} from 'lucide-react';
import useSWR from 'swr';
import fetcher from '@/lib/fetch';
import Loader from '@/components/loader';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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
  cargos: AggregateCount;
  unidades_de_medida: AggregateCount;
  portos: AggregateCount;
  usuarios: AggregateCount;
  embarcacaoWithMostViagens: withMost;
  mestreWithMostViagens: withMost;
  armadorWithMostViagens: withMost;
  comandanteWithMostViagens: withMost;
  capitaoWithMostViagens: withMost;
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
        <div className='flex flex-col lg:flex-row gap-2'>
          <Card className='w-full shadow-xl'>
            <CardHeader>
              <CardTitle className='text-blue-500'>Embarcações</CardTitle>
              <CardDescription>Estatísticas das embarcações</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex flex-col gap-2'>
                <Link href='/admin/embarcacoes'>
                  <StatsCard
                    title='Embarcações'
                    value={stats?.embarcacoes?._count.id || 0}
                    icon={<Ship />}
                  />
                </Link>
                <Link href='/admin/embarcacoes?tipo=tipos'>
                  <StatsCard
                    title='Tipos de Embarcações'
                    value={stats?.tipo_embarcacao?._count.id || 0}
                    icon={<Ship />}
                  />
                </Link>
                <Link
                  href={
                    '/admin/embarcacoes?nome=' +
                    stats?.embarcacaoWithMostViagens?.name
                  }
                >
                  <StatsCard
                    title='Embarcação com mais viagens'
                    value={stats?.embarcacaoWithMostViagens?.name || 'N/A'}
                    icon={<Ship />}
                  />
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className='w-full shadow-xl'>
            <CardHeader>
              <CardTitle className='text-blue-500'>Pessoas</CardTitle>
              <CardDescription>Estatísticas das pessoas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex flex-col  gap-2'>
                <Link href='/admin/pessoas'>
                  <StatsCard
                    title='Total de Pessoas'
                    value={stats?.pessoas?._count.id || 0}
                    icon={<PersonStanding />}
                  />
                </Link>

                <Link
                  href={
                    '/admin/pessoas?nome=' + stats?.mestreWithMostViagens?.name
                  }
                >
                  <StatsCard
                    title='Mestre com mais viagens'
                    value={stats?.mestreWithMostViagens?.name || 'N/A'}
                    icon={<PersonStanding />}
                  />
                </Link>
                <Link
                  href={
                    '/admin/pessoas?nome=' + stats?.armadorWithMostViagens?.name
                  }
                >
                  <StatsCard
                    title='Armador com mais viagens'
                    value={stats?.armadorWithMostViagens?.name || 'N/A'}
                    icon={<PersonStanding />}
                  />
                </Link>
                <Link
                  href={
                    '/admin/pessoas?nome=' +
                    stats?.comandanteWithMostViagens?.name
                  }
                >
                  <StatsCard
                    title='Comandante com mais viagens'
                    value={stats?.comandanteWithMostViagens?.name || 'N/A'}
                    icon={<PersonStanding />}
                  />
                </Link>
                <Link
                  href={
                    '/admin/pessoas?nome=' + stats?.capitaoWithMostViagens?.name
                  }
                >
                  <StatsCard
                    title='Capitão com mais viagens'
                    value={stats?.capitaoWithMostViagens?.name || 'N/A'}
                    icon={<PersonStanding />}
                  />
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className='w-full shadow-xl'>
            <CardHeader>
              <CardTitle className='text-blue-500'>Viagens</CardTitle>
              <CardDescription>Estatísticas das viagens</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex flex-col  gap-2'>
                <Link href='/admin/viagens'>
                  <StatsCard
                    title='Viagens'
                    value={stats?.viagens?._count.id || 0}
                    icon={<GitCompareArrows />}
                  />
                </Link>
                <Link href='/admin/viagens'>
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
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className='w-full shadow-xl'>
            <CardHeader>
              <CardTitle className='text-blue-500'>Portos</CardTitle>
              <CardDescription>Estatísticas dos portos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex flex-col  gap-2'>
                <Link
                  href={
                    '/admin/portos?nome=' + stats?.portoWithMostEscalas?.name
                  }
                >
                  <StatsCard
                    title='Porto com mais escalas'
                    value={
                      stats?.portoWithMostEscalas?.name +
                        ' | ' +
                        stats?.portoWithMostEscalas?.pais || 'N/A'
                    }
                    icon={<AnchorIcon />}
                  />
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className='w-full shadow-xl'>
            <CardHeader>
              <CardTitle className='text-blue-500'>Outros</CardTitle>
              <CardDescription>Outras estatísticas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex flex-col  gap-2'>
                <Link href='/admin/unidades_de_medida'>
                  <StatsCard
                    title='Unidades de Medida'
                    value={stats?.unidades_de_medida?._count.id || 0}
                    icon={<WeightIcon />}
                  />
                </Link>
                <Link href='/admin/pessoas?tipo=titulos'>
                  <StatsCard
                    title='Títulos de Nobreza'
                    value={stats?.titulo_nobreza?._count.id || 0}
                    icon={<CrownIcon />}
                  />
                </Link>
                <Link href='/admin/pessoas?tipo=cargos'>
                  <StatsCard
                    title='Cargos'
                    value={stats?.cargos?._count.id || 0}
                    icon={<TagIcon />}
                  />
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className='w-full shadow-xl'>
            <CardHeader>
              <CardTitle className='text-blue-500'>Usuários</CardTitle>
              <CardDescription>Estatísticas dos Usuários</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex flex-col gap-2'>
                <Link href='/admin/usuarios'>
                  <StatsCard
                    title='Usuários'
                    value={stats?.usuarios?._count.id || 0}
                    icon={<Users />}
                  />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
