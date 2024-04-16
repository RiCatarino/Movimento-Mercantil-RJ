/*
  Warnings:

  - You are about to drop the column `cosignatario` on the `relac_mercadoria_viagem` table. All the data in the column will be lost.
  - Added the required column `id_cosignatario` to the `relac_mercadoria_viagem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "relac_mercadoria_viagem" DROP CONSTRAINT "relac_mercadoria_viagem_cosignatario_fkey";

-- AlterTable
ALTER TABLE "relac_mercadoria_viagem" DROP COLUMN "cosignatario",
ADD COLUMN     "id_cosignatario" SMALLINT NOT NULL;

-- AddForeignKey
ALTER TABLE "relac_mercadoria_viagem" ADD CONSTRAINT "relac_mercadoria_viagem_id_cosignatario_fkey" FOREIGN KEY ("id_cosignatario") REFERENCES "pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
