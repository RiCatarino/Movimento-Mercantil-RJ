import { validateRequest } from '@/auth';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const { user } = await validateRequest();

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { viagem_id, observacoes } = await req.json();

  const result = await prisma.arriba.create({
    data: {
      viagem: {
        connect: {
          id: Number(viagem_id),
        },
      },
      observacoes: observacoes,
    },
  });
  return Response.json(result);
}
