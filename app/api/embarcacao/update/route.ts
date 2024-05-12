import prisma from "@/lib/prisma";

export async function PUT(req: Request) {
  const { id, nome, tipo, observacao } = await req.json();
  const existe = await prisma.embarcacao.findFirst({
    where: {
      id: {
        not: Number(id),
      },
      AND: {
        nome: {
          equals: nome,
          mode: "insensitive",
        },
        tipo_embarcacao: {
          id: {
            equals: Number(tipo),
          },
        },
      },
    },
  });

  if (existe) {
    return new Response("Embarcação já existe", {
      status: 409,
      statusText: "Embarcação já existe",
    });
  }

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
