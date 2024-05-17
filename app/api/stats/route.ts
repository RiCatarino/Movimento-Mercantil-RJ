import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export async function GET() {
  const { user } = await validateRequest();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const embarcacoes = await prisma.embarcacao.aggregate({
    _count: {
      id: true,
    },
  });

  const pessoas = await prisma.pessoa.aggregate({
    _count: {
      id: true,
    },
  });

  const viagens = await prisma.viagem.aggregate({
    _count: {
      id: true,
    },
  });

  const tipo_embarcacao = await prisma.tipo_embarcacao.aggregate({
    _count: {
      id: true,
    },
  });

  const titulo_nobreza = await prisma.titulo_nobreza.aggregate({
    _count: {
      id: true,
    },
  });

  const unidades_de_medida = await prisma.unidade_de_medida.aggregate({
    _count: {
      id: true,
    },
  });

  const portos = await prisma.porto.aggregate({
    _count: {
      id: true,
    },
  });

  const usuarios = await prisma.user.aggregate({
    _count: {
      id: true,
    },
  });

  const result = {
    embarcacoes,
    pessoas,
    viagens,
    tipo_embarcacao,
    titulo_nobreza,
    unidades_de_medida,
    portos,
    usuarios,
  };

  return Response.json(result);
}
