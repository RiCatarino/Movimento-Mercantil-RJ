import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const { unidade } = await req.json();

  // verificar se o nome já existe, se sim, retornar erro, se não, criar

  const result = await prisma.unidade_de_medida.create({
    data: {
      unidade_medida: unidade,
    },
  });
  return Response.json(result);
}
