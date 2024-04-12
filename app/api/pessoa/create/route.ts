import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { nome, id_pais, titulo } = await req.json();
  const result = await prisma.pessoa.create({
    data: {
      nome: nome,
      pais: {
        connect: {
          id: id_pais,
        },
      },
      titulo_nobreza: {
        connect: {
          id: titulo,
        },
      },
    },
  });
  return result;
}
