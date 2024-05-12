import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { cargo } = await req.json();
  const result = await prisma.cargo.create({
    data: {
      cargo: cargo,
    },
  });
  return Response.json(result);
}
