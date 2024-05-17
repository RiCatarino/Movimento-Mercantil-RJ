import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export async function PUT(req: Request) {
  const { user } = await validateRequest();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id, imagem, id_tipo_embarcacao } = await req.json();
  const result = await prisma.imagem_embarcacao.update({
    where: {
      id: Number(id),
    },
    data: {
      imagem: imagem,
      tipo_embarcacao: {
        connect: {
          id: id_tipo_embarcacao,
        },
      },
    },
  });
  return Response.json(result);
}
