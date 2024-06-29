'use client';

import StatsCard from './statscard';
import {
  AnchorIcon,
  CrownIcon,
  GitCompareArrows,
  PersonStanding,
  Ship,
  TagIcon,
  WeightIcon,
} from 'lucide-react';
import useSWR from 'swr';
import fetcher from '@/lib/fetch';
import Loader from '@/components/loader';
import Link from 'next/link';
import { BarChart, Bar, ResponsiveContainer, Tooltip, YAxis } from 'recharts';
// import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';

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

interface top5embarcacoes {
  name: string;
  viagens: number;
}

interface top5paisesportos {
  name: string;
  portos: number;
}

interface top5tiposembarcacoes {
  name: string;
  embarcacoes: number;
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
  // usuarios: AggregateCount;
  // embarcacaoWithMostViagens: withMost;
  mestreWithMostViagens: withMost;
  armadorWithMostViagens: withMost;
  comandanteWithMostViagens: withMost;
  capitaoWithMostViagens: withMost;
  portoWithMostEscalas: withMost;
  viagemWithMostPassageiros: withMost;
  top5EmbarcacoesWithMostViagens: top5embarcacoes[];
  topPaisesWithMostPortos: top5paisesportos[];
  top5TipoEmbarcacao: top5tiposembarcacoes[];
}

export default function Stats() {
  const { data: stats, isLoading } = useSWR<StatsProps>('/api/stats', fetcher);
  const router = useRouter();
  return (
    <>
      {isLoading ? (
        <div className='z-10 flex items-center justify-center text-center  w-full h-screen bg-opacity-70 align-middle'>
          <div className='flex flex-col gap-4 items-center justify-center'>
            <Loader classProp='w-48 h-48' />
            <h1 className='text-2xl font-bold'>A carregar os dados ...</h1>
          </div>
        </div>
      ) : (
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col lg:flex-row gap-2'>
            <Card className='w-full shadow-xl'>
              <CardHeader>
                <CardTitle className='text-blue-500 TEXT'>
                  Embarcações
                </CardTitle>
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
                  {/* <Link
                  href={
                    '/admin/embarcacoes?nome=' +
                    stats?.embarcacaoWithMostViagens?.name
                  }
                > */}
                  {/* <StatsCard
                    title='Embarcação com mais viagens'
                    value={stats?.embarcacaoWithMostViagens?.name || 'N/A'}
                    icon={<Ship />}
                  /> */}
                  {/* </Link> */}
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
                      '/admin/pessoas?nome=' +
                      stats?.mestreWithMostViagens?.name
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
                      '/admin/pessoas?nome=' +
                      stats?.armadorWithMostViagens?.name
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
                      '/admin/pessoas?nome=' +
                      stats?.capitaoWithMostViagens?.name
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
                          'ID: ' +
                            stats?.viagemWithMostPassageiros?.id +
                            ' | ' +
                            stats?.viagemWithMostPassageiros?.count +
                            ' passageiros') ||
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

            {/* <Card className='w-full shadow-xl'>
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
          </Card> */}
          </div>
          <div className='flex flex-wrap'>
            <Card className='w-full shadow-xl'>
              <CardHeader>
                <CardTitle className='text-blue-500'>Top 5</CardTitle>
                {/* <CardDescription></CardDescription> */}
              </CardHeader>
              <CardContent>
                <div className='col-span-1 lg:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-4'>
                  <Card className='w-full shadow-xl'>
                    <CardHeader>
                      <CardTitle className='text-sm font-medium'>
                        Top 5 Embarcações com mais viagens
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer
                        width='100%'
                        minHeight={200}
                        height='95%'
                      >
                        <BarChart
                          width={500}
                          height={100}
                          // className='w-full '
                          data={stats?.top5EmbarcacoesWithMostViagens || []}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <Tooltip
                            cursor={{ fill: 'transparent' }}
                            wrapperStyle={{
                              color: '#fff',
                              backgroundColor: '#000',
                              padding: '5px',
                              borderRadius: '5px',
                            }}
                            content={(prop) =>
                              prop?.payload
                                ? prop?.payload[0]?.payload?.name
                                : 'N/A'
                            }
                          />
                          {/* <YAxis dataKey='viagens' /> */}
                          <Bar
                            label={{ position: 'top', fontSize: 10 }}
                            cursor='pointer'
                            // cursor='pointer'
                            onClick={(e) => {
                              router.push('/admin/embarcacoes?nome=' + e?.name);
                            }}
                            className=' fill-blue-500 hover:fill-slate-400 transition-all duration-500'
                            radius={[10, 10, 0, 0]}
                            dataKey='viagens'
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  <Card className='w-full shadow-xl'>
                    <CardHeader>
                      <CardTitle className='text-sm font-medium'>
                        Top 5 Países com mais portos
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer
                        width='100%'
                        minHeight={200}
                        height='95%'
                      >
                        <BarChart
                          width={500}
                          height={100}
                          // className='w-full '
                          data={stats?.topPaisesWithMostPortos || []}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <Tooltip
                            cursor={{ fill: 'transparent' }}
                            wrapperStyle={{
                              color: '#fff',
                              backgroundColor: '#000',
                              padding: '5px',
                              borderRadius: '5px',
                            }}
                            content={(prop) =>
                              prop?.payload
                                ? prop?.payload[0]?.payload?.name
                                : 'N/A'
                            }
                          />
                          {/* <YAxis dataKey='viagens' /> */}
                          <Bar
                            label={{ position: 'top', fontSize: 10 }}
                            cursor='pointer'
                            // cursor='pointer'
                            onClick={(e) => {
                              router.push('/admin/embarcacoes?nome=' + e?.name);
                            }}
                            className=' fill-blue-500 hover:fill-slate-400 transition-all duration-500'
                            radius={[10, 10, 0, 0]}
                            dataKey='portos'
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* TOP 5 TIPOS DE EMBARCACAO */}
                  <Card className='w-full shadow-xl'>
                    <CardHeader>
                      <CardTitle className='text-sm font-medium'>
                        Top 5 Tipos de embarcações mais comuns
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer
                        width='100%'
                        minHeight={200}
                        height='95%'
                      >
                        <BarChart
                          width={500}
                          height={100}
                          // className='w-full '
                          data={stats?.top5TipoEmbarcacao || []}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <Tooltip
                            cursor={{ fill: 'transparent' }}
                            wrapperStyle={{
                              color: '#fff',
                              backgroundColor: '#000',
                              padding: '5px',
                              borderRadius: '5px',
                            }}
                            content={(prop) =>
                              prop?.payload
                                ? prop?.payload[0]?.payload?.name
                                : 'N/A'
                            }
                          />
                          {/* <YAxis dataKey='viagens' /> */}
                          <Bar
                            label={{ position: 'top', fontSize: 10 }}
                            cursor='pointer'
                            // cursor='pointer'
                            onClick={(e) => {
                              router.push('/admin/embarcacoes?nome=' + e?.name);
                            }}
                            className=' fill-blue-500 hover:fill-slate-400 transition-all duration-500'
                            radius={[10, 10, 0, 0]}
                            dataKey='embarcacoes'
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}
