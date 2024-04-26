import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const { id, imagem, id_tipo_embarcacao } = await req.json();
  const result = await prisma.imagem_embarcacao.create({
    data: {
      id: id,
      imagem: imagem,
      tipo_embarcacao: {
        connect: {
          id: id_tipo_embarcacao,
        },
      },
    },
  });
  return Response.json(result);
}
