import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { start } from "repl";

export async function GET(req: Request) {
  const { user } = await validateRequest();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const pais = searchParams.get("pais");

  const result = await prisma.pais.findMany({
    where: {
      pais: { startsWith: pais?.toString(), mode: "insensitive" },
    },
    select: {
      id: true,
      pais: true,
    },
    orderBy: {
      pais: "asc",
    },
  });
  return Response.json(result);
}
