/*
  Warnings:

  - You are about to drop the column `cosignatario` on the `relac_mercadoria_escala` table. All the data in the column will be lost.
  - Added the required column `id_cosignatario` to the `relac_mercadoria_escala` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "relac_mercadoria_escala" DROP COLUMN "cosignatario",
ADD COLUMN     "id_cosignatario" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "relac_mercadoria_escala" ADD CONSTRAINT "relac_mercadoria_escala_id_cosignatario_fkey" FOREIGN KEY ("id_cosignatario") REFERENCES "pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
