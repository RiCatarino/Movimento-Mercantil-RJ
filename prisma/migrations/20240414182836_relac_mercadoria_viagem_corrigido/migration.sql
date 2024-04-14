/*
  Warnings:

  - You are about to drop the `_relac_mercadoria_viagemToviagem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_relac_mercadoria_viagemToviagem" DROP CONSTRAINT "_relac_mercadoria_viagemToviagem_A_fkey";

-- DropForeignKey
ALTER TABLE "_relac_mercadoria_viagemToviagem" DROP CONSTRAINT "_relac_mercadoria_viagemToviagem_B_fkey";

-- AlterTable
ALTER TABLE "pessoa" ALTER COLUMN "nome" SET DATA TYPE VARCHAR(100);

-- DropTable
DROP TABLE "_relac_mercadoria_viagemToviagem";

-- AddForeignKey
ALTER TABLE "relac_mercadoria_viagem" ADD CONSTRAINT "relac_mercadoria_viagem_id_viagem_fkey" FOREIGN KEY ("id_viagem") REFERENCES "viagem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
