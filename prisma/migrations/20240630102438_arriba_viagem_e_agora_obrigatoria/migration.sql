/*
  Warnings:

  - Made the column `id_viagem` on table `arriba` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "arriba" ALTER COLUMN "id_viagem" SET NOT NULL;
