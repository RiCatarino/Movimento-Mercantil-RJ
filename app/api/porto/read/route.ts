import prisma from "@/lib/prisma";

async function GET() {
  const result = await prisma.porto.findMany({
    select: {
      id: true,
      nome: true,
      pais: true,
    },
  });
  return Response.json(result);
}
