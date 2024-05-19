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

  const embarcacaoWithMostViagens = await prisma.viagem.groupBy({
    by: ["id_embarcacao"],
    _count: {
      _all: true,
    },
    orderBy: {
      _count: {
        id_embarcacao: "desc",
      },
    },
    take: 1,
  });

  const mestreWithMostViagens = await prisma.viagem.groupBy({
    by: ["mestre_id"],
    _count: {
      _all: true,
    },
    orderBy: {
      _count: {
        mestre_id: "desc",
      },
    },
    take: 1,
  });

  const capitaoWithMostViagens = await prisma.viagem.groupBy({
    by: ["capitao_id"],
    _count: {
      _all: true,
    },
    orderBy: {
      _count: {
        capitao_id: "desc",
      },
    },
    take: 1,
  });

  const armadorWithMostViagens = await prisma.viagem.groupBy({
    by: ["armador_id"],
    _count: {
      _all: true,
    },
    orderBy: {
      _count: {
        armador_id: "desc",
      },
    },
    take: 1,
  });

  const comandanteWithMostViagens = await prisma.viagem.groupBy({
    by: ["comandante_id"],
    _count: {
      _all: true,
    },
    orderBy: {
      _count: {
        comandante_id: "desc",
      },
    },
    take: 1,
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
    embarcacaoWithMostViagens: embarcacaoWithMostViagens[0],
    mestreWithMostViagens: mestreWithMostViagens[0],
    capitaoWithMostViagens: capitaoWithMostViagens[0],
    armadorWithMostViagens: armadorWithMostViagens[0],
    comandanteWithMostViagens: comandanteWithMostViagens[0],
  };

  return Response.json(result);
}
