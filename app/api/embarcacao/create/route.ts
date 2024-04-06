import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const { nome, tipo, observacao } = await req.json();
  const result = await prisma.embarcacao.create({
    data: {
      nome: nome,
      observacao: observacao,
      tipo_embarcacao: {
        connect: {
          id: Number(tipo),
        },
      },
    },
  });
  return Response.json(result);
}
