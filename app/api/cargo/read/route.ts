import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export async function GET() {
  const result = await prisma.cargo.findMany({
    select: {
      id: true,
      cargo: true,
    },
  });
  return Response.json(result);
}
