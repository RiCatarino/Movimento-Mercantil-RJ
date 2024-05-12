import prisma from '@/lib/prisma';

export async function PUT(req: Request) {
  const { porto_id, nome, id_pais } = await req.json();

  const existe = await prisma.porto.findFirst({
    where: {
      AND: {
        id: {
          not: Number(porto_id),
        },
        nome: {
          equals: nome,
          mode: 'insensitive',
        },
        pais: {
          id: Number(id_pais),
        },
      },
    },
  });

  if (existe) {
    return new Response('Porto já existe', {
      status: 409,
      statusText: 'Porto já existe',
    });
  }

  const result = await prisma.porto.update({
    where: {
      id: Number(porto_id),
    },
    data: {
      nome: nome,
      pais: {
        connect: {
          id: Number(id_pais),
        },
      },
    },
  });

  return Response.json(result);
}
