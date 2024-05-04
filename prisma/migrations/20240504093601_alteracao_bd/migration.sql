-- DropForeignKey
ALTER TABLE "relac_viagem_referencia_doc" DROP CONSTRAINT "relac_viagem_referencia_doc_id_referencia_documental_fkey";

-- AddForeignKey
ALTER TABLE "relac_viagem_referencia_doc" ADD CONSTRAINT "relac_viagem_referencia_doc_id_referencia_documental_fkey" FOREIGN KEY ("id_referencia_documental") REFERENCES "referencia_documental"("id") ON DELETE CASCADE ON UPDATE CASCADE;
