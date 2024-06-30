import { validateRequest } from '@/auth';
import prisma from '@/lib/prisma';
import dayjs from 'dayjs';
var customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

export async function POST(req: Request) {
  const { user } = await validateRequest();

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const {
    viagem_id,
    porto_id,
    data,
    ano,
    dias_porto,
    entrada_de_passageiros,
    observacoes,
    saida_de_passageiros,
  } = await req.json();
  const result = await prisma.escala.create({
    data: {
      viagem: {
        connect: {
          id: viagem_id,
        },
      },
      porto: {
        connect: {
          id: porto_id,
        },
      },
      data_escala: dayjs(data, 'DD/MM/YYYY').toDate(),
      ano: Number(ano),
      dias_porto: dias_porto,
      entrada_de_passageiros: entrada_de_passageiros,
      saida_de_passageiros: saida_de_passageiros,
      observacoes: observacoes,
    },
  });
  return Response.json(result);
}
