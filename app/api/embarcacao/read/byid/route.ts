import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const result = await prisma.embarcacao.findMany({
    where: {
      id: Number(id),
    },
    select: {
      nome: true,
      observacao: true,
      tipo_embarcacao: true,
      relacao_embarcacao_proprietario: {
        select: {
          data_inicio: true,
          data_fim: true,
          pais: {
            select: {
              pais: true,
            },
          },

          pessoa: {
            select: {
              nome: true,
              pais: {
                select: {
                  pais: true,
                },
              },
              titulo_nobreza: {
                select: {
                  titulo: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return Response.json(result);
}
