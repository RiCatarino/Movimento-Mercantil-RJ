import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  const result = await prisma.tipo_embarcacao.findFirst({
    where: {
      id: Number(id),
    },

    select: {
      id: true,
      tipo: true,
      texto_descritivo: true,
      imagem_embarcacao: true,
      embarcacao: {
        select: {
          id: true,
          nome: true,
        },
      },
    },
  });
  return Response.json(result);
}
