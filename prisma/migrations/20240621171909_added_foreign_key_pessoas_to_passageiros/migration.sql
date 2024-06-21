-- AddForeignKey
ALTER TABLE "passageiro" ADD CONSTRAINT "passageiro_id_pessoa_fkey" FOREIGN KEY ("id_pessoa") REFERENCES "pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE;
