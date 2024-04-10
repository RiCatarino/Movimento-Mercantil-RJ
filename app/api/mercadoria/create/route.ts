import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { nome, id } = await req.json();
  const result = await prisma.mercadoria.create({
    data: {
      id: id,
      nome: nome,
    },
  });
  return result;
}
