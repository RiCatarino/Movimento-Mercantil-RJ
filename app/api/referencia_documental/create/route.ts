import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { nome_periodico, id, date, id_viagem } = await req.json();
  const result = await prisma.referencia_documental.create({
    data: {
      nome_periodico: nome_periodico,
      relacao_viagem_referencia_doc: {
        connect: {
          id: id,
          data_publicacao: date,
          id_viagem: id_viagem,
        },
      },
    },
  });
  return Response.json(result);
}
