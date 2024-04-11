import prisma from "@/lib/prisma";
import dayjs from "dayjs";
var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

export async function POST(req: Request) {
  const { pessoa, data_inicio, data_fim, pais, embarcacao } = await req.json();

  const result = await prisma.relac_embarcacao_proprietario.create({
    data: {
      embarcacao: {
        connect: {
          id: Number(embarcacao),
        },
      },
      pessoa: {
        connect: {
          id: Number(pessoa),
        },
      },
      data_inicio: dayjs(data_inicio, "DD/MM/YYYY").toDate(),
      data_fim: dayjs(data_fim, "DD/MM/YYYY").toDate(),
      pais: {
        connect: {
          id: Number(pais),
        },
      },
    },
  });
  return Response.json(result);
}
