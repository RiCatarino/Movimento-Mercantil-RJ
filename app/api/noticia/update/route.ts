import prisma from "@/lib/prisma";

export async function PUT(req: Request) {
  const { id_noticia, id, assunto } = await req.json();
  const result = await prisma.noticia.update({
    where: {
      id: Number(id_noticia),
    },

    data: {
      assunto: assunto,
      viagem: {
        connect: {
          id: Number(id),
        },
      },
    },
  });
  return Response.json(result);
}
