import prisma from "@/lib/prisma";

export async function PUT(req: Request) {
  const { cargo, id, id_pessoa } = await req.json();
  const result = await prisma.cargo.update({
    where: {
      id: Number(id),
    },
    data: {
      cargo: cargo,
      relacao_pessoa_cargo: {
        connect: {
          id: Number(id_pessoa),
        },
      },
    },
  });
  return Response.json(result);
}
