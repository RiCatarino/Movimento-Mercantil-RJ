import prisma from "@/lib/prisma";

export async function GET (){
    const result = await prisma.noticia.findMany({

        select:{
            assunto: true,
        }})
    return Response.json(result)
}