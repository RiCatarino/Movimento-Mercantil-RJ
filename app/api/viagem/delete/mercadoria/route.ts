import prisma from '@/lib/prisma';

export async function DELETE(req: Request) {
  const { id } = await req.json();

  const result = await prisma.relac_mercadoria_viagem.delete({
    where: { id },
  });
  return Response.json(result);
}
