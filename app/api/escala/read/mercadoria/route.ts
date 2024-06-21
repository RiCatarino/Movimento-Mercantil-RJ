import { validateRequest } from '@/auth';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { user } = await validateRequest();

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const escala_id = searchParams.get('id_escala');

  const result = await prisma.relac_mercadoria_escala.findMany({
    where: {
      id_escala: Number(escala_id),
    },
    include: {
      mercadoria: true,
      unidade_de_medida: true,
    },
  });

  return Response.json(result);
}
