import prisma from '@/lib/prisma';

export async function DELETE(req: Request) {
  const { id } = await req.json();
  const result = await prisma.relac_mercadoria_escala.delete({
    where: {
      id: id,
    },
  });

  if (!result) {
    return new Response('Mercadoria não encontrada', { status: 404 });
  }

  return Response.json(result);
}
