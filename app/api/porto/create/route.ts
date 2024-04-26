import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const { nome, id_pais, pais } = await req.json();
  const result = await prisma.porto.create({
    data: {
      nome: nome,
      pais: {
        connect: {
          id: id_pais,
        },
      },
    },
  });
  return Response.json(result);
}
