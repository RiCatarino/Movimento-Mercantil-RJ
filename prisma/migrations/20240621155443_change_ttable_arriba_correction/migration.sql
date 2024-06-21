-- DropForeignKey
ALTER TABLE "arriba" DROP CONSTRAINT "arriba_id_viagem_fkey";

-- AddForeignKey
ALTER TABLE "arriba" ADD CONSTRAINT "arriba_id_viagem_fkey" FOREIGN KEY ("id_viagem") REFERENCES "viagem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
