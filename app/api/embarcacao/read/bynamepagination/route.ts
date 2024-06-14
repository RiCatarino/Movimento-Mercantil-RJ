import { validateRequest } from '@/auth';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const nome = searchParams.get('nome');
  const { user } = await validateRequest();
  const page = searchParams.get('page');

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const embarcacoes = await prisma.embarcacao.findMany({
    where: {
      nome: {
        startsWith: nome?.toString(),
        mode: 'insensitive',
      },
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
          imagem_embarcacao: {
            select: {
              imagem: true,
            },
          },
        },
      },
    },
    orderBy: {
      nome: 'asc',
    },
    take: 10,
    skip: page ? 10 * (+page - 1) : 0,
  });

  const total = await prisma.embarcacao.count({
    where: {
      nome: {
        startsWith: nome?.toString(),
        mode: 'insensitive',
      },
    },
  });

  const result = {
    embarcacoes,
    total,
  };

  return Response.json(result);
}
