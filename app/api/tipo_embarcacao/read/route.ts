import prisma from "@/lib/prisma";

export async function GET() {
    const result = await prisma.tipo_embarcacao.findMany({
    
        select: {
            texto_descritivo: true,
            tipo: true,
            embarcacao: {
                select: {
                    nome: true
                }
                },
            imagem_embarcacao: {
            select: {
                imagem: true
            }
            },
                }
    })
    return Response.json(result)
}