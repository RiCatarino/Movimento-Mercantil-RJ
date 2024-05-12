import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const {
    cosignatario,
    mercadoria,
    unidade_de_medida,
    quantidade,
    valor_frete,
    escala_id,
    movimento,
  } = await req.json();

  //if there are no fields, return an error
  if (
    !cosignatario &&
    !mercadoria &&
    !unidade_de_medida &&
    !quantidade &&
    !valor_frete &&
    !movimento
  ) {
    return new Response('Preencha pelo menos um dos campos', {
      status: 400,
      statusText: 'Preencha pelo menos um dos campos',
    });
  }

  const result = await prisma.relac_mercadoria_escala.create({
    data: {
      escala: {
        connect: {
          id: Number(escala_id),
        },
      },
      cosignatario: cosignatario
        ? {
            connect: {
              id: Number(cosignatario),
            },
          }
        : undefined,
      mercadoria: mercadoria
        ? {
            connect: {
              id: Number(mercadoria),
            },
          }
        : undefined,
      unidade_de_medida: unidade_de_medida
        ? {
            connect: {
              id: Number(unidade_de_medida),
            },
          }
        : undefined,
      valor_frete: valor_frete ? Number(valor_frete) : undefined,
      quantidade: quantidade ? Number(quantidade) : undefined,
      movimento: movimento ? movimento : undefined,
    },
  });
  return Response.json(result);
}
