import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const { id_viagem, assunto, viagem } = await req.json();
  const result = await prisma.noticia.create({
    data: {
      viagem: {
        connect: {
          id: id_viagem,
        },
      },
      assunto: assunto,
    },
  });
  return Response.json(result);
}
