import prisma from "@/lib/prisma";

export async function GET (){
    const result = await prisma.referencia_documental.findMany({
        where: {
            id: 1
        },
        select:{
            nome_periodico: true
        }

    })
    return Response.json(result)
}