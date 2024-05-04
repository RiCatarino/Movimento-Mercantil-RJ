import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const {
    cosignatario,
    mercadoria,
    unidade_de_medida,
    quantidade,
    valor_frete,
    viagem_id,
  } = await req.json();
  const result = await prisma.relac_mercadoria_viagem.create({
    data: {
      viagem: {
        connect: {
          id: Number(viagem_id),
        },
      },
      cosignatario: {
        connect: {
          id: Number(cosignatario),
        },
      },
      mercadoria: {
        connect: {
          id: Number(mercadoria),
        },
      },
      unidade_de_medida: {
        connect: {
          id: Number(unidade_de_medida),
        },
      },
      quantidade_origem: Number(quantidade),
      valor_frete: Number(valor_frete),
    },
  });
  return Response.json(result);
}
