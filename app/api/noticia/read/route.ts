import prisma from "@/lib/prisma";

export async function GET (){
    const result = await prisma.noticia.findMany({
        where:{
            id:1,
        },
        select:{
            assunto: true,
        }})
    return Response.json(result)
}