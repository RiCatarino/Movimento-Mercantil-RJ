import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const nome = searchParams.get('nome');
  const result = await prisma.embarcacao.findMany({
    where: {
      nome: {
        contains: nome?.toString(),
        mode: 'insensitive',
      },
    },
    select: {
      id: true,
      nome: true,
      observacao: true,
      tipo_embarcacao: true,
    },
  });

  return Response.json(result);
}
