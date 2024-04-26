import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const { cargo, id, id_pessoa } = await req.json();
  const result = await prisma.cargo.create({
    data: {
      id: id,
      cargo: cargo,
      relacao_pessoa_cargo: {
        create: {
          id_pessoa: id_pessoa,
        },
      },
    },
  });
  return Response.json(result);
}
