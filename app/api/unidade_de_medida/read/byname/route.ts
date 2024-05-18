import { validateRequest } from '@/auth';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { user } = await validateRequest();

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const unidade_medida = searchParams.get('unidade_medida');

  const result = await prisma.unidade_de_medida.findMany({
    where: {
      unidade_medida: {
        startsWith: unidade_medida?.toString(),
        mode: 'insensitive',
      },
    },
    select: {
      id: true,
      unidade_medida: true,
    },
    orderBy: {
      unidade_medida: 'asc',
    },
  });
  return Response.json(result);
}
