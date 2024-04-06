import prisma from "@/lib/prisma";

export async function POST (req: Request){
    const {nome,id_tipo_embarcacao,observacao} = await req.json()
    const result = await prisma.embarcacao.create({

        data: {
            nome: nome,
            observacao: observacao,
            tipo_embarcacao: {
                connect: {
                    id: Number(id_tipo_embarcacao)

                }
            }
        }
    })
    return result
}