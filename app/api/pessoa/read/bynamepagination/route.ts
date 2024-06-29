import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const nome = searchParams.get('nome');
  const page = searchParams.get('page');

  const pessoas = await prisma.pessoa.findMany({
    where: {
      nome: {
        startsWith: nome?.toString(),
        mode: 'insensitive',
      },
    },
    select: {
      id: true,
      nome: true,
      pais: true,
      titulo_nobreza: {
        select: {
          id: true,
          titulo: true,
        },
      },

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
    take: 10,
    skip: page ? 10 * (+page - 1) : 0,
  });

  const total = await prisma.pessoa.count({
    where: {
      nome: { startsWith: nome?.toString(), mode: 'insensitive' },
    },
  });

  const result = {
    pessoas,
    total,
  };

  return Response.json(result);
}
