import prisma from "@/lib/prisma";

export async function DELETE(req: Request) {
  const { id } = await req.json();

  const post = await prisma.relac_embarcacao_proprietario.delete({
    where: {
      id: Number(id),
    },
  });
  return Response.json(post);
}
