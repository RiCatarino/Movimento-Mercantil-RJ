import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export async function DELETE(req: Request) {
  const { user } = await validateRequest();

  if (!user || user.role !== "ADMIN") {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id } = await req.json();

  const post = await prisma.user.delete({
    where: { id },
  });
  return Response.json(post);
}
