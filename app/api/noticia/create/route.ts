import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const { viagem_id, assunto } = await req.json();
  const result = await prisma.noticia.create({
    data: {
      viagem: {
        connect: {
          id: viagem_id,
        },
      },
      assunto: assunto,
    },
  });
  return Response.json(result);
}
