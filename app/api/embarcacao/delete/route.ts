import prisma from '@/lib/prisma';

export async function DELETE(req: Request) {
  const { id } = await req.json();

  const result = await prisma.embarcacao.delete({
    where: {
      id: Number(id),
    },
  });
  return Response.json(result);
}
