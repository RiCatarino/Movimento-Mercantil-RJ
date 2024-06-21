/*
  Warnings:

  - You are about to drop the column `pessoaId` on the `relac_mercadoria_escala` table. All the data in the column will be lost.
  - You are about to drop the column `id_cosignatario` on the `relac_mercadoria_viagem` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "relac_mercadoria_escala" DROP CONSTRAINT "relac_mercadoria_escala_pessoaId_fkey";

-- DropForeignKey
ALTER TABLE "relac_mercadoria_viagem" DROP CONSTRAINT "relac_mercadoria_viagem_id_cosignatario_fkey";

-- AlterTable
ALTER TABLE "relac_mercadoria_escala" DROP COLUMN "pessoaId";

-- AlterTable
ALTER TABLE "relac_mercadoria_viagem" DROP COLUMN "id_cosignatario";
