import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const nome = searchParams.get("nome");

  const result = await prisma.pessoa.findMany({
    where: {
      nome: {
        startsWith: nome?.toString(),
      },
    },
    select: {
      id: true,
      nome: true,
      pais: true,
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
  });

  return Response.json(result);
}
