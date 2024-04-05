import prisma from "@/lib/prisma";

export async function GET (){
    const result = await prisma.cargo.findMany({
        select:{
            cargo: true
        }

    })
    return Response.json(result)
}