import prisma from '@/lib/prisma';

export async function GET() {
  const result = await prisma.mercadoria.findMany({
    select: {
      id: true,
      nome: true,
    },
  });
  return Response.json(result);
}
