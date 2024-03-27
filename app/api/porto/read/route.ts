import prisma from "@/lib/prisma";

export async function GET() {
    const result = await prisma.porto.findMany({
        where: {
            id: 1
        },
        select: {
            nome: true,
            pais: true,
            viagem: {
                select: {
                    id: true
                }
        },
        escala: {
            select: {
                id: true,
            }
        },
        }})
        return Response.json(result)
}