import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const { imagem, tipo_id } = await req.json();
  const result = await prisma.imagem_embarcacao.create({
    data: {
      imagem: imagem,
      tipo_embarcacao: {
        connect: {
          id: tipo_id,
        },
      },
    },
  });
  return Response.json(result);
}
