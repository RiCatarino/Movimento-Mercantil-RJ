import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export async function GET() {
  const result = await prisma.noticia.findMany({
    select: {
      assunto: true,
    },
  });
  return Response.json(result);
}
