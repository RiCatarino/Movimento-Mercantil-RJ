import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export async function PUT(req: Request) {
  const { user } = await validateRequest();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { nome, id } = await req.json();
  const result = await prisma.mercadoria.update({
    where: {
      id: Number(id),
    },
    data: {
      nome: nome,
    },
  });
  return Response.json(result);
}
