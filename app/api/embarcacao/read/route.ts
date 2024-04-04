import prism from "@/lib/prisma";

export async function GET() {
  const result = await prism.embarcacao.findMany({
    select: {
      id: true,
      nome: true,
      observacao: true,
      tipo_embarcacao: { select: { texto_descritivo: true, tipo: true } },
    },
  });
  return Response.json(result);
}
