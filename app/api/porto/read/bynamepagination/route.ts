import { validateRequest } from '@/auth';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { user } = await validateRequest();

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const nome = searchParams.get('nome');
  const page = searchParams.get('page');

  const portos = await prisma.porto.findMany({
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
    },
    orderBy: {
      nome: 'asc',
    },
    take: 10,
    skip: page ? 10 * (+page - 1) : 0,
  });

  const total = await prisma.porto.count({
    where: {
      nome: { startsWith: nome?.toString(), mode: 'insensitive' },
    },
  });

  const result = {
    portos,
    total,
  };

  return Response.json(result);
}
