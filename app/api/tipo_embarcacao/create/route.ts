import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { user } = await validateRequest();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { tipo, descricao } = await req.json();

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
      tipo: tipo,
      texto_descritivo: descricao,
    },
  });
  return Response.json(result);
}
