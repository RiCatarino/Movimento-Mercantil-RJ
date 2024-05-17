import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import dayjs from "dayjs";
var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

export async function POST(req: Request) {
  const { user } = await validateRequest();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { nome_periodico, data, viagem_id } = await req.json();
  const result = await prisma.referencia_documental.create({
    data: {
      nome_periodico: nome_periodico,
      relacao_viagem_referencia_doc: {
        create: {
          id_viagem: viagem_id,
          data_publicacao: dayjs(data, "DD-MM-YYYY").toDate(),
        },
      },
    },
  });
  return Response.json(result);
}
