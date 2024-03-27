import prisma from "@/lib/prisma";

export async function POST (req: Request){
    const {titulo} = await req.json()
    const result = await prisma.titulo_nobreza.create({
        data: {
            titulo: titulo,
        }
    })
    return result
}