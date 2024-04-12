import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { nome, pais, titulo_nobreza } = await req.json();
  const result = await prisma.pessoa.create({
    data: {
      nome: nome,
      pais: {
        connect: {
          id: Number(pais),
        },
      },
      titulo_nobreza: {
        connect: {
          id: Number(titulo_nobreza),
        },
      },
    },
  });
  return Response.json(result);
}
