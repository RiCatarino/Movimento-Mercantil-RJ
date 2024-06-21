/*
  Warnings:

  - You are about to drop the column `id_escala` on the `arriba` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "arriba" DROP CONSTRAINT "arriba_id_escala_fkey";

-- AlterTable
ALTER TABLE "arriba" DROP COLUMN "id_escala",
ADD COLUMN     "id_viagem" SMALLINT;

-- AlterTable
ALTER TABLE "pessoa" ADD COLUMN     "id_pessoa" SMALLINT;

-- AddForeignKey
ALTER TABLE "arriba" ADD CONSTRAINT "arriba_id_viagem_fkey" FOREIGN KEY ("id_viagem") REFERENCES "escala"("id") ON DELETE CASCADE ON UPDATE CASCADE;
