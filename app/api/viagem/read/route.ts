import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export async function GET() {
  const { user } = await validateRequest();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

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
      observacoes: true,
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
      data_rio: "asc",
    },
  });
  return Response.json(result);
}
