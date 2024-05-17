import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { user } = await validateRequest();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { imagem, tipo_id } = await req.json();
  const result = await prisma.imagem_embarcacao.create({
    data: {
      imagem: imagem,
      tipo_embarcacao: {
        connect: {
          id: tipo_id,
        },
      },
    },
  });
  return Response.json(result);
}
