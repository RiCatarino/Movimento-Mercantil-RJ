import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export async function PUT(req: Request) {
  const { cargo, id } = await req.json();
  const { user } = await validateRequest();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const existe = await prisma.cargo.findFirst({
    where: {
      AND: [
        {
          cargo: {
            equals: cargo,
            mode: "insensitive",
          },
        },
        {
          id: {
            not: Number(id),
          },
        },
      ],
    },
  });

  if (existe) {
    return new Response("Cargo já existe", {
      status: 409,
      statusText: "Cargo já existe",
    });
  }

  const result = await prisma.cargo.update({
    where: {
      id: Number(id),
    },
    data: {
      cargo: cargo,
    },
  });
  return Response.json(result);
}
