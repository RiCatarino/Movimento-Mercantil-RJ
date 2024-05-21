import { validateRequest } from '@/auth';
import prisma from '@/lib/prisma';
import dayjs from 'dayjs';

var customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

export const dynamic = 'force-dynamic';
export async function GET(req: Request) {
  const { user } = await validateRequest();

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search');
  const ano = searchParams.get('ano');
  const tipo = searchParams.get('tipo');
  const result = await prisma.viagem.findMany({
    where: {
      AND: [
        {
          embarcacao: {
            nome: { startsWith: search?.toString(), mode: 'insensitive' },
          },
        },
        ...(ano && ano !== 'none'
          ? [
              {
                data_rio: {
                  gte: new Date(`${ano}-01-01`),
                  lte: new Date(`${ano}-12-31`),
                },
              },
            ]
          : []),

        ...(tipo && tipo !== 'none'
          ? [
              {
                entrada_sahida: tipo?.toString(),
              },
            ]
          : []),
      ],
    },

    select: {
      id: true,
      id_embarcacao: true,
      id_porto_origem: true,
      id_porto_destino: true,
      data_viagem: true,
      dias_porto_destino: true,
      dias_porto_origem: true,
      mestre_id: true,
      capitao_id: true,
      comandante_id: true,
      entrada_sahida: true,
      dias_viagem: true,
      data_chegada: true,
      data_rio: true,
      armador_id: true,
      tripulacao: true,
      total_passageiros: true,
      embarcacao: {
        select: {
          nome: true,
        },
      },

      porto_origem: {
        select: {
          nome: true,
          pais: {
            select: {
              pais: true,
            },
          },
        },
      },
      porto_destino: {
        select: {
          nome: true,
          pais: {
            select: {
              pais: true,
            },
          },
        },
      },
      mestre: {
        select: {
          nome: true,
        },
      },
      capitao: {
        select: {
          nome: true,
        },
      },
      comandante: {
        select: {
          nome: true,
        },
      },
      armador: {
        select: {
          nome: true,
        },
      },
    },

    take: 100,

    orderBy: {
      id: 'asc',
    },
  });
  return Response.json(result);
}
