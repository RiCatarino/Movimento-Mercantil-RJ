import { validateRequest } from '@/auth';
import prisma from '@/lib/prisma';

export async function PUT(req: Request) {
  const { user } = await validateRequest();

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { titulo, id } = await req.json();

  const existe = await prisma.titulo_nobreza.findFirst({
    where: {
      AND: [
        {
          titulo: {
            equals: titulo,
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
    return new Response('Título de Nobreza já existe', {
      status: 409,
      statusText: 'Título de Nobreza já existe',
    });
  }

  const result = await prisma.titulo_nobreza.update({
    where: {
      id: id,
    },
    data: {
      titulo: titulo,
    },
  });
  return Response.json(result);
}
