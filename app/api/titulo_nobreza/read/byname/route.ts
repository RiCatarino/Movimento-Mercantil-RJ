import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { start } from "repl";

export async function GET(req: Request) {
  const { user } = await validateRequest();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const titulo = searchParams.get("titulo");

  const result = await prisma.titulo_nobreza.findMany({
    where: {
      titulo: { startsWith: titulo?.toString(), mode: "insensitive" },
    },
    select: {
      id: true,
      titulo: true,
    },
  });
  return Response.json(result);
}
