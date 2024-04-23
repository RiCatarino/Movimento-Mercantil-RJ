/*
  Warnings:

  - Added the required column `observacoes` to the `viagem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "viagem" ADD COLUMN     "observacoes" VARCHAR NOT NULL;
