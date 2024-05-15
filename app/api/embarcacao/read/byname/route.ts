import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const nome = searchParams.get("nome");
  const result = await prisma.embarcacao.findMany({
    where: {
      nome: {
        startsWith: nome?.toString(),
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      nome: true,
      observacao: true,
      tipo_embarcacao: {
        select: {
          id: true,
          texto_descritivo: true,
          tipo: true,
          imagem_embarcacao: true,
        },
      },
      pais: true,
    },
  });

  return Response.json(result);
}
