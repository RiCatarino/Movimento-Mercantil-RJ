import prisma from '@/lib/prisma';
import dayjs from 'dayjs';
var customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);
export async function POST(req: Request) {
  const { cargo, data, ano, pessoa } = await req.json();

  const result = await prisma.relac_pessoa_cargo.create({
    data: {
      pessoa: {
        connect: {
          id: Number(pessoa),
        },
      },

      cargo: {
        connect: {
          id: Number(cargo),
        },
      },
      data_cargo: dayjs(data, 'DD/MM/YYYY').toDate(),
      ano: Number(ano),
    },
  });
  return Response.json(result);
}
