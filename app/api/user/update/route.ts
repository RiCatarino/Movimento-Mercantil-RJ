import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export async function PUT(req: Request) {
  const { id, nome, email, role, password_hash } = await req.json();
  const { user } = await validateRequest();

  if (!user || user.role !== "ADMIN") {
    return new Response("Unauthorized", { status: 401 });
  }

  const result = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      nome: nome,
      email: email,
      role: role,
      password_hash: password_hash,
    },
  });
  return Response.json(result);
}
