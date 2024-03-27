import prisma from "@/lib/prisma";

export async function GET() {
    const result = await prisma.pais.findMany({
        where: {
            id: 1
        },
        select: {
            pais: true,
            gentilico: true
        }
    })
    return Response.json(result)
}