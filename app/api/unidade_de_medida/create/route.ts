import prisma from "@/lib/prisma";

export async function POST (req: Request){
    const {unidade_medida} = await req.json()
    const result = await prisma.unidade_de_medida.create({
        data: {
            unidade_medida: unidade_medida,
        }
    })
    return result
}