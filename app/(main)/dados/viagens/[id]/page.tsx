import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import tz from 'dayjs/plugin/timezone';
import TablePassageiros from '../_components/tables/tablepassageiros';
import TableEscalas from '../_components/tables/tableescalas';
import TableArribas from '../_components/tables/tablearribas';
import TableRefDocumental from '../_components/tables/tablerefdoc';
import TableMercadorias from '../_components/tables/tablemercadorias';
import TableNews from '../_components/tables/tablenews';
import prisma from '@/lib/prisma';

dayjs.extend(utc);
dayjs.extend(tz);

async function getData(id: string) {
  const res = await prisma.viagem.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      armador: true,
      capitao: true,
      comandante: true,
      consignatario: true,
      embarcacao: {
        include: {
          tipo_embarcacao: {
            include: {
              imagem_embarcacao: true,
            },
          },
        },
      },
      escala: true,
      noticia: true,
      passageiro: {
        include: {
          tipo_passageiro: true,
        },
      },
      porto_destino: {
        include: {
          pais: true,
        },
      },
      porto_origem: {
        include: {
          pais: true,
        },
      },
      relac_mercadoria_viagem: true,
      relac_viagem_referencia_doc: true,
      arriba: true,
    },
  });

  return res;
}

export default async function TripPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const viagem = (await getData(params.id)) as unknown as Viagem;

  return (
    <div className='p-1 md:p-4 mt-10 lg:mx-24 bg-white rounded-xl flex flex-col gap-2 shadow-2xl dark:bg-slate-700'>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-wrap gap-2'>
          <div className='flex flex-col border gap-1 rounded-xl grow'>
            <div className='p-2 text-sm bg-blue-200 dark:bg-slate-900 rounded-ss-xl rounded-se-xl'>
              Data de Partida
            </div>
            <div className='p-2 text-xs'>
              {viagem?.data_viagem
                ? dayjs.tz(viagem.data_viagem, 'UTC').format('DD/MM/YYYY')
                : 'N/A'}
            </div>
          </div>

          <div className='flex flex-col border gap-1 rounded-xl grow'>
            <div className='p-2 text-sm bg-blue-200 dark:bg-slate-900 rounded-ss-xl rounded-se-xl'>
              Porto de Origem
            </div>
            <div className='p-2 text-xs'>
              {viagem?.porto_origem?.nome
                ? viagem?.porto_origem?.nome +
                  ' | ' +
                  viagem?.porto_origem?.pais?.pais
                : 'N/A'}
            </div>
          </div>
          <div className='flex flex-col border gap-1 rounded-xl grow'>
            <div className='p-2 text-sm bg-blue-200 dark:bg-slate-900 rounded-ss-xl rounded-se-xl'>
              Dias no porto de origem
            </div>
            <div className='p-2 text-xs'>
              {viagem?.dias_porto_origem || 'N/A'}
            </div>
          </div>
        </div>

        <div className='flex flex-wrap gap-2'>
          <div className='flex flex-col border gap-1 rounded-xl grow'>
            <div className='p-2 text-sm bg-blue-200 dark:bg-slate-900 rounded-ss-xl rounded-se-xl'>
              Data de Chegada
            </div>
            <div className='p-2 text-xs'>
              {viagem?.data_chegada
                ? dayjs.tz(viagem.data_chegada, 'UTC').format('DD/MM/YYYY')
                : 'N/A'}{' '}
            </div>
          </div>

          <div className='flex flex-col border gap-1 rounded-xl grow'>
            <div className='p-2 text-sm bg-blue-200 dark:bg-slate-900 rounded-ss-xl rounded-se-xl'>
              Porto de Destino
            </div>
            <div className='p-2 text-xs'>
              {viagem?.porto_destino?.nome +
                ' | ' +
                viagem?.porto_destino?.pais?.pais}
            </div>
          </div>
          <div className='flex flex-col border gap-1 rounded-xl grow'>
            <div className='p-2 text-sm bg-blue-200 dark:bg-slate-900 rounded-ss-xl rounded-se-xl'>
              Dias no porto de destino
            </div>
            <div className='p-2 text-xs'>
              {viagem?.dias_porto_destino || 'N/A'}
            </div>
          </div>
        </div>

        <div className='flex flex-wrap gap-2'>
          <div className='flex flex-col border gap-1 rounded-xl grow'>
            <div className='p-2 text-sm bg-blue-200 dark:bg-slate-900 rounded-ss-xl rounded-se-xl'>
              Data Rio
            </div>
            <div className='p-2 text-xs'>
              {viagem?.data_rio
                ? dayjs.tz(viagem.data_rio, 'UTC').format('DD/MM/YYYY')
                : 'N/A'}{' '}
            </div>
          </div>
          <div className='flex flex-col border gap-1 rounded-xl grow'>
            <div className='p-2 text-sm bg-blue-200 dark:bg-slate-900 rounded-ss-xl rounded-se-xl'>
              Dias de Viagem
            </div>
            <div className='p-2 text-xs'>{viagem?.dias_viagem}</div>
          </div>
          {/* <div className='flex flex-col border gap-1 rounded-xl grow'>
                <div className='p-2 text-sm bg-blue-200 dark:bg-slate-900 rounded-ss-xl rounded-se-xl'>
                  Tripulação
                </div>
                <div className='p-2 text-xs'>{viagem?.tripulacao}</div>
              </div> */}
          {/* <div className="flex flex-col border gap-1 rounded-xl grow">
                  <div className="p-2 text-sm bg-blue-200 dark:bg-slate-900 rounded-ss-xl rounded-se-xl">
                    Passageiros
                  </div>
                  <div className="p-2 text-xs">{viagem?.total_passageiros}</div>
                </div> */}
        </div>
      </div>

      <div className='flex flex-col flex-1 w-full max-w-xs  md:max-w-full gap-2'>
        <Accordion
          type='single'
          collapsible
          className='flex flex-col flex-1 w-full'
        >
          <AccordionItem value='vessel' className='w-full'>
            <AccordionTrigger>Embarcação</AccordionTrigger>
            <AccordionContent>
              <div className='flex flex-row flex-1 gap-2'>
                <div className='flex flex-col border gap-1 rounded-xl grow'>
                  <div className='p-2 text-sm bg-blue-200 dark:bg-slate-900 rounded-ss-xl rounded-se-xl'>
                    Nome
                  </div>
                  <div className='p-2 text-xs'>{viagem?.embarcacao?.nome}</div>
                </div>
                <div className='flex flex-col border gap-1 rounded-xl grow'>
                  <div className='p-2 text-sm bg-blue-200 dark:bg-slate-900 rounded-ss-xl rounded-se-xl'>
                    Tipo
                  </div>
                  <div className='p-2 text-xs'>
                    {viagem?.embarcacao?.tipo_embarcacao?.tipo}
                  </div>
                </div>
              </div>
              <div className='flex flex-col mt-2 border gap-1 rounded-xl grow'>
                <div className='p-2 text-sm bg-blue-200 dark:bg-slate-900 rounded-ss-xl rounded-se-xl'>
                  Descrição
                </div>
                <div className='p-2 text-xs'>
                  {viagem?.embarcacao?.tipo_embarcacao?.texto_descritivo}
                </div>
              </div>
              {viagem?.embarcacao?.tipo_embarcacao?.imagem_embarcacao &&
                viagem?.embarcacao?.tipo_embarcacao?.imagem_embarcacao.length >
                  0 && (
                  <div className='flex flex-col p-2 gap-2'>
                    <div className='flex flex-wrap gap-2'>
                      {viagem?.embarcacao?.tipo_embarcacao?.imagem_embarcacao?.map(
                        (img) => (
                          // { X Button in upper right corner of the image}
                          <img
                            key={img.id}
                            src={img.imagem}
                            alt={viagem?.embarcacao?.tipo_embarcacao?.tipo}
                            className='w-full border rounded-lg  max-h-64 md:max-w-96 md:w-auto'
                          />
                        )
                      )}
                    </div>
                  </div>
                )}
              <div className='flex flex-col w-full mt-2 border gap-1 rounded-xl'>
                <div className='p-2 text-sm bg-blue-200 dark:bg-slate-900 rounded-ss-xl rounded-se-xl'>
                  Observação
                </div>
                <div className='p-2 text-xs'>
                  {viagem?.embarcacao?.observacao}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='crew' className='w-full'>
            <AccordionTrigger>Tripulação</AccordionTrigger>
            <AccordionContent>
              <div className='flex flex-wrap flex-1 gap-2'>
                <div className='flex flex-col border gap-1 rounded-xl grow'>
                  <div className='p-2 text-sm bg-blue-200 dark:bg-slate-900 rounded-ss-xl rounded-se-xl'>
                    Comandante
                  </div>
                  <div className='p-2 text-xs'>{viagem?.comandante?.nome}</div>
                </div>
                <div className='flex flex-col border gap-1 rounded-xl grow'>
                  <div className='p-2 text-sm bg-blue-200 dark:bg-slate-900 rounded-ss-xl rounded-se-xl'>
                    Capitão
                  </div>
                  <div className='p-2 text-xs'>{viagem?.capitao?.nome}</div>
                </div>
                <div className='flex flex-col border gap-1 rounded-xl grow'>
                  <div className='p-2 text-sm bg-blue-200 dark:bg-slate-900 rounded-ss-xl rounded-se-xl'>
                    Armador
                  </div>
                  <div className='p-2 text-xs'>{viagem?.armador?.nome}</div>
                </div>
                <div className='flex flex-col border gap-1 rounded-xl grow'>
                  <div className='p-2 text-sm bg-blue-200 dark:bg-slate-900 rounded-ss-xl rounded-se-xl'>
                    Mestre
                  </div>
                  <div className='p-2 text-xs'>{viagem?.mestre?.nome}</div>
                </div>
                <div className='flex flex-col border gap-1 rounded-xl grow'>
                  <div className='p-2 text-sm bg-blue-200 dark:bg-slate-900 rounded-ss-xl rounded-se-xl'>
                    Cosignatario
                  </div>
                  <div className='p-2 text-xs'>
                    {viagem?.consignatario?.nome}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='passengers' className='w-full'>
            <AccordionTrigger>Passageiros</AccordionTrigger>
            <AccordionContent>
              <TablePassageiros
                passageiros={viagem?.passageiro}
                viagem_id={viagem?.id}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='Escalas' className='w-full'>
            <AccordionTrigger>Escalas</AccordionTrigger>
            <AccordionContent>
              <TableEscalas escalas={viagem?.escala} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='arribas' className='w-full'>
            <AccordionTrigger>Arribas</AccordionTrigger>
            <AccordionContent>
              <TableArribas arribas={viagem?.arriba} viagem_id={viagem?.id} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='cargo' className='w-full'>
            <AccordionTrigger>Mercadoria</AccordionTrigger>
            <AccordionContent>
              <TableMercadorias
                mercadorias={viagem?.relac_mercadoria_viagem}
                viagem_id={viagem?.id}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='docref' className='w-full'>
            <AccordionTrigger>Referências Documentais</AccordionTrigger>
            <AccordionContent>
              <TableRefDocumental
                viagem_id={viagem?.id}
                refdocs={viagem?.relac_viagem_referencia_doc}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='news' className='w-full'>
            <AccordionTrigger>Notícias</AccordionTrigger>
            <AccordionContent>
              <TableNews news={viagem?.noticia} viagem_id={viagem?.id} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
