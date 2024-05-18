import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { user } = await validateRequest();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search");

  const result = await prisma.user.findMany({
    where: {
      OR: [
        {
          nome: { startsWith: search?.toString(), mode: "insensitive" },
        },
        {
          email: { startsWith: search?.toString(), mode: "insensitive" },
        },
      ],
    },

    select: {
      id: true,
      nome: true,
      email: true,
    },
  });

  return Response.json(result);
}
