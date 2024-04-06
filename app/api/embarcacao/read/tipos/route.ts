import prism from "@/lib/prisma";

export async function GET() {
  const result = await prism.tipo_embarcacao.findMany({
    select: {
      id: true,
      texto_descritivo: true,
      tipo: true,
    },
  })};