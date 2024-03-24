import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  console.log(id);
  const result = await prisma.embarcacao.findUnique({
    where: {
      id: Number(id),
      relacao_embarcacao_proprietario: {
        some: {
          id_embarcacao: Number(id),
        },
      },
    },

    select: {
      nome: true,
      tipo_embarcacao: true,
      relacao_embarcacao_proprietario: {
        select: {
          pessoa: {
            select: {
              nome: true,
            },
          },
          embarcacao: {
            select: {
              nome: true,
            },
          },
        },
      },
    },
  });
  return Response.json(result);
}
