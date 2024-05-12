import prisma from "@/lib/prisma";

export async function PUT(req: Request) {
  const { id, nome, pais } = await req.json();

  const existe = await prisma.porto.findFirst({
    where: {
      nome: {
        equals: nome,
        mode: "insensitive",
      },
      pais: {
        id: Number(pais),
      },
    },
  });

  if (existe) {
    return new Response("Porto já existe", {
      status: 409,
      statusText: "Porto já existe",
    });
  }

  const result = await prisma.porto.update({
    where: {
      id: Number(id),
    },
    data: {
      nome: nome,
      pais: {
        connect: {
          id: Number(pais),
        },
      },
    },
  });

  return Response.json(result);
}
