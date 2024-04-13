import prisma from "@/lib/prisma";

export async function PUT(req: Request) {
  const { id, nome, tipo, observacao } = await req.json();
  const result = await prisma.embarcacao.update({
    where: {
      id: Number(id),
    },
    data: {
      nome: nome,
      observacao: observacao,
      tipo_embarcacao: {
        connect: {
          id: Number(tipo),
        },
      },
    },
  });
  return Response.json(result);
}
