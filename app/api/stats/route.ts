import prisma from "@/lib/prisma";

export async function GET() {
  const embarcacoes = await prisma.embarcacao.aggregate({
    _count: {
      id: true,
    },
  });

  const pessoa = await prisma.pessoa.aggregate({
    _count: {
      id: true,
    },
  });

  const viagens = await prisma.viagem.aggregate({
    _count: {
      id: true,
    },
  });

  const result = { embarcacoes, pessoa, viagens };
  return Response.json(result);
}
