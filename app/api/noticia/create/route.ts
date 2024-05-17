import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { user } = await validateRequest();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { viagem_id, assunto } = await req.json();
  const result = await prisma.noticia.create({
    data: {
      viagem: {
        connect: {
          id: viagem_id,
        },
      },
      assunto: assunto,
    },
  });
  return Response.json(result);
}
