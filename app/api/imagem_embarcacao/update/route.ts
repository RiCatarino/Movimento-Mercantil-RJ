import prisma from "@/lib/prisma";

export async function UPDATE(req: Request) {
  const { id, imagem, id_tipo_embarcacao } = await req.json();
  const result = await prisma.imagem_embarcacao.update({
    where: {
      id: Number(id),
    },
    data: {
      imagem: imagem,
      tipo_embarcacao: {
        connect: {
          id: id_tipo_embarcacao,
        },
      },
    },
  });
  return Response.json(result);
}
