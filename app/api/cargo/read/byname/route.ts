import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { user } = await validateRequest();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const cargo = searchParams.get("cargo");

  const result = await prisma.cargo.findMany({
    where: {
      cargo: { startsWith: cargo?.toString(), mode: "insensitive" },
    },
    select: {
      id: true,
      cargo: true,
    },
    orderBy: {
      cargo: "asc",
    },
  });
  return Response.json(result);
}
