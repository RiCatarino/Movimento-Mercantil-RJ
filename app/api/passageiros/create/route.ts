import { validateRequest } from '@/auth';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const { user } = await validateRequest();

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { viagem_id, tipodepassageiro, total, observacoes } = await req.json();

  const result = await prisma.passageiro.create({
    data: {
      viagem: {
        connect: {
          id: Number(viagem_id),
        },
      },
      tipo_passageiro: {
        connect: {
          id: Number(tipodepassageiro),
        },
      },
      total: total,
      observacoes: observacoes,
    },
  });
  return Response.json(result);
}
