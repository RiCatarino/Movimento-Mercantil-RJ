-- AlterTable
ALTER TABLE "embarcacao" ADD COLUMN     "id_pais" INTEGER;

-- AddForeignKey
ALTER TABLE "embarcacao" ADD CONSTRAINT "embarcacao_id_pais_fkey" FOREIGN KEY ("id_pais") REFERENCES "pais"("id") ON DELETE SET NULL ON UPDATE CASCADE;
