import { validateRequest } from '@/auth';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { user } = await validateRequest();

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const result = await prisma.viagem.findUnique({
    where: {
      id: Number(id),
    },

    include: {
      embarcacao: {
        include: {
          tipo_embarcacao: {
            include: {
              imagem_embarcacao: true,
            },
          },
        },
      },
      porto_origem: {
        include: {
          pais: true,
        },
      },
      porto_destino: {
        include: {
          pais: true,
        },
      },

      mestre: true,
      capitao: true,
      comandante: true,
      armador: true,
      consignatario: true,
      escala: {
        select: {
          id: true,
          data_escala: true,
          dias_porto: true,
          porto: {
            select: {
              id: true,
              nome: true,
            },
          },
          entrada_de_passageiros: true,
          saida_de_passageiros: true,
        },
      },

      passageiro: {
        select: {
          id: true,
          tipo_passageiro: {
            select: {
              tipo: true,
            },
          },
          total: true,
          observacoes: true,
        },
      },

      relac_mercadoria_viagem: {
        include: {
          mercadoria: true,
          unidade_de_medida: true,
        },
      },
      relac_viagem_referencia_doc: {
        select: {
          id: true,
          data_publicacao: true,
          referencia_documental: {
            select: {
              id: true,
              nome_periodico: true,
            },
          },
        },
      },
      noticia: {
        select: {
          id: true,
          assunto: true,
        },
      },
      arriba: {
        select: {
          id: true,
          observacoes: true,
        },
      },
    },
  });
  return Response.json(result);
}
