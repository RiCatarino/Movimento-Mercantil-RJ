import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const { pais, gentilico } = await req.json();
  const result = await prisma.pais.create({
    data: {
      pais: pais,
      gentilico: gentilico,
    },
  });
  return Response.json(result);
}
