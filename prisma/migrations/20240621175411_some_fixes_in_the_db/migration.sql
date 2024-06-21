/*
  Warnings:

  - You are about to drop the column `id_pessoa` on the `passageiro` table. All the data in the column will be lost.
  - You are about to drop the column `total_passageiros` on the `viagem` table. All the data in the column will be lost.
  - You are about to drop the column `tripulacao` on the `viagem` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "passageiro" DROP CONSTRAINT "passageiro_id_pessoa_fkey";

-- AlterTable
ALTER TABLE "passageiro" DROP COLUMN "id_pessoa",
ADD COLUMN     "id_viagem" SMALLINT;

-- AlterTable
ALTER TABLE "viagem" DROP COLUMN "total_passageiros",
DROP COLUMN "tripulacao";

-- AddForeignKey
ALTER TABLE "passageiro" ADD CONSTRAINT "passageiro_id_viagem_fkey" FOREIGN KEY ("id_viagem") REFERENCES "viagem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
