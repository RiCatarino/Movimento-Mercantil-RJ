import prisma from "@/lib/prisma";

export async function PUT(req: Request) {
  const { nome, id } = await req.json();
  const result = await prisma.mercadoria.update({
    where: {
      id: Number(id),
    },
    data: {
      nome: nome,
    },
  });
  return Response.json(result);
}
