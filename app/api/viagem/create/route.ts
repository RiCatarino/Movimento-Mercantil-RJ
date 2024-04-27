import prisma from '@/lib/prisma';
import dayjs from 'dayjs';
var customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

export async function POST(req: Request) {
  const {
    id_embarcacao,
    porto_origem,
    porto_destino,
    data_viagem,
    dias_porto_destino,
    dias_porto_origem,
    id_mestre,
    id_capitao,
    id_comandante,
    id_armador,
    entrada_sahida,
    dias_viagem,
    data_chegada,
    data_rio,
    tripulacao,
    passageiros,
  } = await req.json();

  console.log(data_rio);
  console.log(dayjs(data_rio, 'DD-MM-YYYY').isValid());

  const result = await prisma.viagem.create({
    data: {
      data_viagem: dayjs(data_viagem, 'DD-MM-YYYY').isValid()
        ? dayjs(data_viagem, 'DD-MM-YYYY').toDate()
        : null,
      dias_porto_destino: Number(dias_porto_destino) || null,
      dias_porto_origem: Number(dias_porto_origem) || null,
      entrada_sahida: entrada_sahida || null,
      dias_viagem: Number(dias_viagem) || null,
      data_chegada: dayjs(data_chegada, 'DD-MM-YYYY').isValid()
        ? dayjs(data_chegada, 'DD-MM-YYYY').toDate()
        : null,
      data_rio: dayjs(data_rio, 'DD-MM-YYYY').isValid()
        ? dayjs(data_rio, 'DD-MM-YYYY').toDate()
        : null,
      tripulacao: Number(tripulacao) || null,
      total_passageiros: Number(passageiros) || null,
      mestre_id: Number(id_mestre) || undefined,
      capitao_id: Number(id_capitao) || undefined,
      comandante_id: Number(id_comandante) || undefined,
      armador_id: Number(id_armador) || undefined,
      id_embarcacao: Number(id_embarcacao) || undefined,
      id_porto_origem: Number(porto_origem) || undefined,
      id_porto_destino: Number(porto_destino) || undefined,
    },
  });
  return Response.json(result);
}
