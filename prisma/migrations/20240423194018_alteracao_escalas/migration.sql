/*
  Warnings:

  - You are about to alter the column `movimento` on the `relac_mercadoria_escala` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1)`.

*/
-- AlterTable
ALTER TABLE "escala" ALTER COLUMN "data_escala" DROP NOT NULL;

-- AlterTable
ALTER TABLE "relac_mercadoria_escala" ALTER COLUMN "movimento" SET DATA TYPE VARCHAR(1);
