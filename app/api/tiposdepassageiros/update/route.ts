import { validateRequest } from '@/auth';
import prisma from '@/lib/prisma';

export async function PUT(req: Request) {
  const { user } = await validateRequest();

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { tipo, id } = await req.json();

  const existe = await prisma.tipo_passageiro.findFirst({
    where: {
      AND: [
        {
          tipo: {
            equals: tipo,
            mode: 'insensitive',
          },
        },
        {
          id: {
            not: Number(id),
          },
        },
      ],
    },
  });

  if (existe) {
    return new Response('Tipo já existe', {
      status: 409,
      statusText: 'Tipo já existe',
    });
  }

  const result = await prisma.tipo_passageiro.update({
    where: {
      id: Number(id),
    },
    data: {
      tipo: tipo,
    },
  });
  return Response.json(result);
}
