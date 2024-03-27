import prisma from "@/lib/prisma";

export async function POST (req: Request){
    const {nome} = await req.json()
    const result = await prisma.mercadoria.create({
        data: {
            nome: nome,
        }
    })
    return result
}