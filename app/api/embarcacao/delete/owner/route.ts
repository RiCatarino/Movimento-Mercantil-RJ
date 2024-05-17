import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export async function DELETE(req: Request) {
  const { id } = await req.json();
  const { user } = await validateRequest();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const result = await prisma.relac_embarcacao_proprietario.delete({
    where: {
      id: Number(id),
    },
  });
  return Response.json(result);
}
