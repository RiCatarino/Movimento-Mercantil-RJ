import prisma from '@/lib/prisma';

export async function GET() {
  const result = await prisma.pessoa.findMany({
    where: {
      id: 1,
      relacao_embarcacao_proprietario: {
        some: {
          id_embarcacao: 3,
        },
      },
    },

    select: {
      nome: true,
      relacao_embarcacao_proprietario: {
        select: {
          embarcacao: {
            select: {
              nome: true,
            },
          },
        },
      },
    },
  });

  return Response.json(result);
}
