import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export async function GET() {
  const { user } = await validateRequest();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const result = await prisma.imagem_embarcacao.findMany({
    select: {
      id: true,
      imagem: true,
      tipo_embarcacao: {
        select: {
          id: true,
        },
      },
    },
  });
  return Response.json(result);
}
