import { validateRequest } from '@/auth';
import prisma from '@/lib/prisma';

export async function DELETE(req: Request) {
  const { user } = await validateRequest();

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { id } = await req.json();
  const result = await prisma.passageiro.delete({
    where: {
      id: id,
    },
  });

  if (!result) {
    return new Response('Passageiros não encontrados', { status: 404 });
  }

  return Response.json(result);
}
