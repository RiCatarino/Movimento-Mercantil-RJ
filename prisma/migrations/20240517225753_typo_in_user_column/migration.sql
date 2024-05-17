/*
  Warnings:

  - You are about to drop the column `abilitado` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "abilitado",
ADD COLUMN     "habilitado" BOOLEAN NOT NULL DEFAULT true;
