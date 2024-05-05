import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { nome, id_pais, pais } = await req.json();

  const existe = await prisma.porto.findFirst({
    where: {
      nome: {
        equals: nome,
        mode: "insensitive",
      },
      id_pais: {
        equals: id_pais,
      },
    },
  });

  if (existe) {
    return new Response("Unidade já existe", {
      status: 409,
      statusText: "Unidade já existe",
    });
  }

  const result = await prisma.porto.create({
    data: {
      nome: nome,
      pais: {
        connect: {
          id: id_pais,
        },
      },
    },
  });
  return Response.json(result);
}
