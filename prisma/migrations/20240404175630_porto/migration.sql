-- AddForeignKey
ALTER TABLE "viagem" ADD CONSTRAINT "viagem_id_porto_destino_fkey" FOREIGN KEY ("id_porto_destino") REFERENCES "porto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
