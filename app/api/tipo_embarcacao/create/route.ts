import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const { texto_descritivo, tipo } = await req.json();
  const result = await prisma.tipo_embarcacao.create({
    data: {
      texto_descritivo: texto_descritivo,
      tipo: tipo,
    },
  });
  return Response.json(result);
}
