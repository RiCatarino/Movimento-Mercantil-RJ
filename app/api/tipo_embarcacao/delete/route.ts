import prisma from "@/lib/prisma";

export async function DELETE(req: Request) {
  const { id } = await req.json();

  const post = await prisma.tipo_embarcacao.delete({
    where: { id },
  });
  return Response.json(post);
}
