import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const result = await prisma.viagem.findUnique({
    where: {
      id: Number(id),
    },

    include: {
      embarcacao: {
        include: {
          tipo_embarcacao: true,
        },
      },
      porto_origem: true,
      porto_destino: true,
      mestre: true,
      capitao: true,
      comandante: true,
      armador: true,
      escala: {
        include: {
          porto: true,
          relac_mercadoria_escala: {
            include: {
              mercadoria: true,
              unidade_de_medida: true,
              cosignatario: true,
            },
          },
        },
      },

      relac_mercadoria_viagem: {
        include: {
          mercadoria: true,
          unidade_de_medida: true,
          cosignatario: true,
        },
      },
      relac_viagem_referencia_doc: true,
    },
  });
  return Response.json(result);
}
