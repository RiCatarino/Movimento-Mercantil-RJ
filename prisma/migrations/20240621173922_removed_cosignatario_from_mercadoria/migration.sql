/*
  Warnings:

  - You are about to drop the column `id_cosignatario` on the `relac_mercadoria_escala` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "relac_mercadoria_escala" DROP CONSTRAINT "relac_mercadoria_escala_id_cosignatario_fkey";

-- AlterTable
ALTER TABLE "relac_mercadoria_escala" DROP COLUMN "id_cosignatario",
ADD COLUMN     "pessoaId" INTEGER;

-- AddForeignKey
ALTER TABLE "relac_mercadoria_escala" ADD CONSTRAINT "relac_mercadoria_escala_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "pessoa"("id") ON DELETE SET NULL ON UPDATE CASCADE;
