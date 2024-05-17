import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export async function DELETE(req: Request) {
  const { user } = await validateRequest();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id } = await req.json();

  const result = await prisma.escala.delete({
    where: {
      id: Number(id),
    },
  });
  return Response.json(result);
}
