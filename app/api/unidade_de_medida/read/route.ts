import prisma from "@/lib/prisma";

export async function GET (){
    const result = await prisma.unidade_de_medida.findMany({
        where: {
            id: 1
        },
        select:{
            unidade_medida: true
        }

    })
    return Response.json(result)
}