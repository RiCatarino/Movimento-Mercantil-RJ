import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  const result = await prisma.pessoa.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      titulo_nobreza: true,
      pais: true,
      relacao_embarcacao_proprietario: {
        select: {
          id: true,
          embarcacao: true,
          data_inicio: true,
          data_fim: true,
          pais: true,
        },
      },
    },
  });

  return Response.json(result);
}
