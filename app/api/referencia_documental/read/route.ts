import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export async function GET() {
  const result = await prisma.referencia_documental.findMany({
    select: {
      nome_periodico: true,
    },
  });
  return Response.json(result);
}
