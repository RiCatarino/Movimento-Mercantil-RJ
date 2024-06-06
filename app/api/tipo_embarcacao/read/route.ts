import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export async function GET() {
  const { user } = await validateRequest();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const result = await prisma.tipo_embarcacao.findMany({
    select: {
      id: true,
      tipo: true,
      texto_descritivo: true,
    },
    orderBy: {
      tipo: "asc",
    },
  });
  return Response.json(result);
}
