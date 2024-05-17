-- DropForeignKey
ALTER TABLE "embarcacao" DROP CONSTRAINT "embarcacao_id_tipo_embarcacao_fkey";

-- AddForeignKey
ALTER TABLE "embarcacao" ADD CONSTRAINT "embarcacao_id_tipo_embarcacao_fkey" FOREIGN KEY ("id_tipo_embarcacao") REFERENCES "tipo_embarcacao"("id") ON DELETE CASCADE ON UPDATE CASCADE;
