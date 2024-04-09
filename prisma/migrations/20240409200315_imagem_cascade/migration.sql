-- DropForeignKey
ALTER TABLE "imagem_embarcacao" DROP CONSTRAINT "imagem_embarcacao_id_tipo_embarcacao_fkey";

-- AddForeignKey
ALTER TABLE "imagem_embarcacao" ADD CONSTRAINT "imagem_embarcacao_id_tipo_embarcacao_fkey" FOREIGN KEY ("id_tipo_embarcacao") REFERENCES "tipo_embarcacao"("id") ON DELETE CASCADE ON UPDATE CASCADE;
