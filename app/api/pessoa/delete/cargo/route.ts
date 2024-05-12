import prisma from '@/lib/prisma';

export async function DELETE(req: Request) {
  const { id } = await req.json();
  const result = await prisma.relac_pessoa_cargo.delete({
    where: {
      id: id,
    },
  });

  if (!result) {
    return new Response('Relação não encontrada', { status: 404 });
  }

  return Response.json(result);
}
