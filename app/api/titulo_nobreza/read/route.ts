import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export async function GET() {
  const result = await prisma.titulo_nobreza.findMany({
    select: {
      id: true,
      titulo: true,
    },
  });
  return Response.json(result);
}
