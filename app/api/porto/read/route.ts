import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export async function GET() {
  const result = await prisma.porto.findMany({
    select: {
      id: true,
      nome: true,
      pais: true,
    },
  });
  return Response.json(result);
}
