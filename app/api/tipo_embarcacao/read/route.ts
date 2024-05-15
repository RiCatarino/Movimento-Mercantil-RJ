import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export async function GET() {
  const result = await prisma.tipo_embarcacao.findMany({
    select: {
      id: true,
      tipo: true,
    },
  });
  return Response.json(result);
}
