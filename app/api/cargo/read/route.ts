import prisma from '@/lib/prisma';

export async function GET() {
  const result = await prisma.cargo.findMany({
    select: {
      id: true,
      cargo: true,
    },
  });
  return Response.json(result);
}
