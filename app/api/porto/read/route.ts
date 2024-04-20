import prisma from '@/lib/prisma';

export async function GET() {
  const result = await prisma.porto.findMany({
    select: {
      nome: true,
      pais: true,
    },
  });
  return Response.json(result);
}
