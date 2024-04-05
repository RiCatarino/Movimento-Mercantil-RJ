import prisma from "@/lib/prisma";

export async function GET (){
    const result = await prisma.titulo_nobreza.findMany({
        select:{
            titulo: true
        }

    })
    return Response.json(result)
}