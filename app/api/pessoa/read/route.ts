import prisma from "@/lib/prisma";

export async function GET() {
  const result = await prisma.pessoa.findMany({
    select: {
      id: true,
      nome: true,
      pais: true,
      titulo_nobreza: {
        select: {
          titulo: true,
        },
      },
      relacao_embarcacao_proprietario: {
        select: {
          embarcacao: {
            select: {
              nome: true,
            },
          },
        },
      },
    },
    take: 10,
  });

  return Response.json(result);
}
