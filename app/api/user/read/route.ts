import { validateRequest } from '@/auth';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { user } = await validateRequest();

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const result = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      nome: true,
      habilitado: true,
      role: true,
    },
    orderBy: {
      nome: 'asc',
    },
  });
  return Response.json(result);
}
