import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { user } = await validateRequest();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { nome, id } = await req.json();
  const result = await prisma.mercadoria.create({
    data: {
      id: id,
      nome: nome,
    },
  });
  return Response.json(result);
}
