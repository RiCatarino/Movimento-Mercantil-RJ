import { validateRequest } from '@/auth';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const { user } = await validateRequest();

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { tipo } = await req.json();
  const result = await prisma.tipo_passageiro.create({
    data: {
      tipo: tipo,
    },
  });
  return Response.json(result);
}
