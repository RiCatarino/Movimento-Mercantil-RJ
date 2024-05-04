import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const { nome, gentilico } = await req.json();
  const result = await prisma.pais.create({
    data: {
      pais: nome,
      gentilico: gentilico,
    },
  });
  return Response.json(result);
}
