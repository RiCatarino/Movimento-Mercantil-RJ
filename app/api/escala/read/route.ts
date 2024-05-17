import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export async function GET() {
  const { user } = await validateRequest();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const result = await prisma.escala.findMany({
    select: {
      data_escala: true,
      ano: true,
      dias_porto: true,
      entrada_de_passageiros: true,
      saida_de_passageiros: true,
    },
  });
  return Response.json(result);
}
