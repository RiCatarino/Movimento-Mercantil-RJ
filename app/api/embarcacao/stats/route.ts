import prisma from "@/lib/prisma";

export async function GET() {
  const aggregations = await prisma.embarcacao.aggregate({
    _count: {
      id: true,
    },
  });
  return Response.json(aggregations);
}
