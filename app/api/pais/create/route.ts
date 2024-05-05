import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { nome, gentilico } = await req.json();

  const existe = await prisma.pais.findFirst({
    where: {
      pais: {
        equals: nome,
        mode: "insensitive",
      },
    },
  });

  if (existe) {
    return new Response("Unidade já existe", {
      status: 409,
      statusText: "Unidade já existe",
    });
  }

  const result = await prisma.pais.create({
    data: {
      pais: nome,
      gentilico: gentilico,
    },
  });
  return Response.json(result);
}
