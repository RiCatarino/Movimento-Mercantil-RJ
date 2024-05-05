import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { texto_descritivo, tipo } = await req.json();

  const existe = await prisma.tipo_embarcacao.findFirst({
    where: {
      tipo: tipo,
    },
  });

  if (existe) {
    return new Response("Tipo de Embarcação já existe", {
      status: 409,
      statusText: "Tipo de Embarcação já existe",
    });
  }

  const result = await prisma.tipo_embarcacao.create({
    data: {
      texto_descritivo: texto_descritivo,
      tipo: tipo,
    },
  });
  return Response.json(result);
}
