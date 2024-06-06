import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export async function PUT(req: Request) {
  const { user } = await validateRequest();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id, unidade } = await req.json();

  const result = await prisma.unidade_de_medida.update({
    where: {
      id,
    },
    data: {
      unidade_medida: unidade,
    },
  });
  return Response.json(result);
}
