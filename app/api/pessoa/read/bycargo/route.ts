import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const result = await prisma.relac_pessoa_cargo.findMany({
    where: {
      id_cargo: Number(id),
    },
    select: {
      pessoa: {
        select: {
          id: true,
          nome: true,
          pais: true,
        },
      },
    },
  });
  return Response.json(result);
}
