import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { user } = await validateRequest();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { cargo } = await req.json();
  const result = await prisma.cargo.create({
    data: {
      cargo: cargo,
    },
  });
  return Response.json(result);
}
