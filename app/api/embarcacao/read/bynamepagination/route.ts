import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const nome = searchParams.get("nome");
  const { user } = await validateRequest();

  const tipo = searchParams.get("tipo");
  const page = searchParams.get("page");

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const embarcacao = await prisma.embarcacao.findMany({
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
          imagem_embarcacao: {
            select: {
              imagem: true,
            },
          },
        },
      },
    },
    orderBy: {
      nome: "asc",
    },
    take: 10,
    skip: page ? 10 * (+page - 1) : 0,
  });

  const total = await prisma.tipo_embarcacao.count({
    where: {
      tipo: { startsWith: tipo?.toString(), mode: "insensitive" },
    },
  });

  const result = {
    embarcacao,
    total,
  };

  return Response.json(result);
}
