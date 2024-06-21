-- AddForeignKey
ALTER TABLE "passageiro" ADD CONSTRAINT "passageiro_id_tipo_passageiro_fkey" FOREIGN KEY ("id_tipo_passageiro") REFERENCES "tipo_passageiro"("id") ON DELETE CASCADE ON UPDATE CASCADE;
