import prisma from "@/lib/prisma";

export async function POST (req: Request){
    const {nome_periodico} = await req.json()
    const result = await prisma.referencia_documental.create({
        data: {
            nome_periodico: nome_periodico,
        }
    })
    return result
}