import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export async function GET() {
  const { user } = await validateRequest();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const result = await prisma.unidade_de_medida.findMany({
    select: {
      id: true,
      unidade_medida: true,
    },
  });
  return Response.json(result);
}
