import prisma from "@/lib/prisma";

export async function GET (){
    const result = await prisma.cargo.findMany({
        where: {
            id: 1
        },
        select:{
            cargo: true
        }

    })
    return Response.json(result)
}