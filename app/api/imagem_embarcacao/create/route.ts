import prisma from "@/lib/prisma";

export async function POST (req: Request){
    const {imagem,id_tipo_embarcacao} = await req.json()
    const result = await prisma.imagem_embarcacao.create({
        data: {
            imagem: imagem,
            tipo_embarcacao: {
                connect: {
                    id: id_tipo_embarcacao
                }
            }
        }
    })
    return result
}