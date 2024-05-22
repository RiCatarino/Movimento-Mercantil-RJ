import { validateRequest } from '@/auth';
import prism from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export async function GET() {
  const { user } = await validateRequest();

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const result = await prism.embarcacao.findMany({
    select: {
      id: true,
      nome: true,
      observacao: true,
      tipo_embarcacao: {
        select: {
          id: true,
          texto_descritivo: true,
          tipo: true,
          imagem_embarcacao: {
            select: {
              imagem: true,
            },
          },
        },
      },
    },
    orderBy: {
      nome: 'asc',
    },
  });
  return Response.json(result);
}
