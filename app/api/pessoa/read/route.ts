import { validateRequest } from '@/auth';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic'; // needed because of mutations

export async function GET() {
  const { user } = await validateRequest();

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const result = await prisma.pessoa.findMany({
    select: {
      id: true,
      nome: true,
      pais: true,
      titulo_nobreza: {
        select: {
          id: true,
          titulo: true,
        },
      },
      relacao_embarcacao_proprietario: {
        select: {
          embarcacao: {
            select: {
              nome: true,
            },
          },
        },
      },
    },
    take: 10,

    orderBy: {
      id: 'desc',
    },
  });

  return NextResponse.json(result);
}
