import prism from "@/lib/prisma";

export async function GET() {
    const result = await prism.embarcacao.findMany({
        where: {
            id: 1
        },
        select: {
            nome: true
        }
    })
    return Response.json(result)
}
