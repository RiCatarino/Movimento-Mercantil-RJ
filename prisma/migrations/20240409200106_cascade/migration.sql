-- DropForeignKey
ALTER TABLE "relac_embarcacao_proprietario" DROP CONSTRAINT "relac_embarcacao_proprietario_id_embarcacao_fkey";

-- AddForeignKey
ALTER TABLE "relac_embarcacao_proprietario" ADD CONSTRAINT "relac_embarcacao_proprietario_id_embarcacao_fkey" FOREIGN KEY ("id_embarcacao") REFERENCES "embarcacao"("id") ON DELETE CASCADE ON UPDATE CASCADE;
