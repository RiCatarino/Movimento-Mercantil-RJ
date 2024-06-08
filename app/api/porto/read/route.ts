import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  const { user } = await validateRequest();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");

  const result = await prisma.porto.findMany({
    select: {
      id: true,
      nome: true,
      pais: true,
    },
    orderBy: {
      nome: "asc",
    },
    take: 10,
    skip: page ? 10 * (+page - 1) : 0,
  });
  return Response.json(result);
}
