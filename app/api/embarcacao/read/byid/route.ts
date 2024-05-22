import { validateRequest } from '@/auth';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const { user } = await validateRequest();

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const result = await prisma.embarcacao.findFirst({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
      nome: true,
      observacao: true,
      tipo_embarcacao: {
        select: {
          id: true,
          texto_descritivo: true,
          tipo: true,
          imagem_embarcacao: true,
        },
      },
      relacao_embarcacao_proprietario: {
        select: {
          id: true,
          data_inicio: true,
          data_fim: true,
          pais: {
            select: {
              pais: true,
            },
          },
          pessoa: {
            select: {
              nome: true,
              pais: {
                select: {
                  pais: true,
                },
              },
              titulo_nobreza: {
                select: {
                  titulo: true,
                },
              },
            },
          },
        },
      },
      viagem: {
        select: {
          id: true,
          data_rio: true,
          entrada_sahida: true,
          porto_origem: {
            select: {
              id: true,
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
              id: true,
              nome: true,
              pais: {
                select: {
                  pais: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return Response.json(result);
}
