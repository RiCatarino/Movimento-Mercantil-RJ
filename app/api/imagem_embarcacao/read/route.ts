import prisma from "@/lib/prisma";

export async function GET() {
    const result = await prisma.imagem_embarcacao.findMany({
        where: {
            id: 1
        },
        select: {
            id: true,
            imagem: true,
            tipo_embarcacao: {
                select: {
                    id: true
                }
        },
        }
    })
    return Response.json(result)
}