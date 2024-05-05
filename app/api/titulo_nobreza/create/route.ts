import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { titulo } = await req.json();

  const existe = await prisma.titulo_nobreza.findFirst({
    where: {
      titulo: {
        equals: titulo,
        mode: "insensitive",
      },
    },
  });

  if (existe) {
    return new Response("Título de Nobreza já existe", {
      status: 409,
      statusText: "Título de Nobreza já existe",
    });
  }

  const result = await prisma.titulo_nobreza.create({
    data: {
      titulo: titulo,
    },
  });
  return Response.json(result);
  result;
}
