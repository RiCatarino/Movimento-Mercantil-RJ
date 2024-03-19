/*
  Warnings:

  - Added the required column `data_chegada` to the `viagem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_rio` to the `viagem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dias_viagem` to the `viagem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entrada_sahida` to the `viagem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tipo_embarcacao" ALTER COLUMN "tipo" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "viagem" ADD COLUMN     "data_chegada" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "data_rio" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dias_viagem" INTEGER NOT NULL,
ADD COLUMN     "entrada_sahida" VARCHAR(7) NOT NULL;
