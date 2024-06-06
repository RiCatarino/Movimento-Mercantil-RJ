import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { start } from "repl";

export async function GET(req: Request) {
  const { user } = await validateRequest();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const tipo = searchParams.get("tipo");

  const result = await prisma.tipo_embarcacao.findMany({
    where: {
      tipo: { startsWith: tipo?.toString(), mode: "insensitive" },
    },
    select: {
      id: true,
      tipo: true,
      texto_descritivo: true,
    },
    orderBy: {
      tipo: "asc",
    },
  });

  return Response.json(result);
}
