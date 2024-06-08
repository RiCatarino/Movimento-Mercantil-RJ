import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export async function GET() {
  const { user } = await validateRequest();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const result = await prisma.porto.findMany({
    select: {
      id: true,
      nome: true,
      pais: true,
    },
    orderBy: {
      nome: "asc",
    },
  });
  return Response.json(result);
}
