-- AlterTable
ALTER TABLE "viagem" ADD COLUMN     "id_consignatario" SMALLINT;

-- AddForeignKey
ALTER TABLE "viagem" ADD CONSTRAINT "viagem_id_consignatario_fkey" FOREIGN KEY ("id_consignatario") REFERENCES "pessoa"("id") ON DELETE SET NULL ON UPDATE CASCADE;
