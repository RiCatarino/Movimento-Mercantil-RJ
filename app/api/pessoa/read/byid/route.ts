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
      relacao_pessoa_cargo: {
        select: {
          id: true,
          cargo: true,
          data_cargo: true,
          ano: true,
        },
      },
    },
  });

  return Response.json(result);
}
