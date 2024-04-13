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
    },
  });
  return Response.json(result);
}
