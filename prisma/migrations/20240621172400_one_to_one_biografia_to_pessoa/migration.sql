/*
  Warnings:

  - A unique constraint covering the columns `[id_pessoa]` on the table `minibiografia` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "minibiografia_id_pessoa_key" ON "minibiografia"("id_pessoa");
