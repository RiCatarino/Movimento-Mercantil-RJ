import prisma from "@/lib/prisma";

export async function GET() {
  const result = await prisma.viagem.findMany({
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
    take: 10,
  });
  return Response.json(result);
}
