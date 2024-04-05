import prisma from "@/lib/prisma";

export async function GET() {
    const result = await prisma.escala.findMany({
        select: {
            data_escala: true,
            ano: true,
            dias_porto: true,
            entrada_de_passageiros: true,
            saida_de_passageiros: true,
        }

    })
    return Response.json(result)
}