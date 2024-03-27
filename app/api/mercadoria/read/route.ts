import prisma from "@/lib/prisma";

export async function GET (){
    const result = await prisma.mercadoria.findMany({
        where: {
            id: 1
        },
        select:{
            nome: true
        }

    })
    return Response.json(result)
}