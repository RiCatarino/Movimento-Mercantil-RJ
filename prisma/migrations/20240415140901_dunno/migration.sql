-- DropForeignKey
ALTER TABLE "relac_mercadoria_viagem" DROP CONSTRAINT "relac_mercadoria_viagem_id_viagem_fkey";

-- CreateTable
CREATE TABLE "_relac_mercadoria_viagemToviagem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_relac_mercadoria_viagemToviagem_AB_unique" ON "_relac_mercadoria_viagemToviagem"("A", "B");

-- CreateIndex
CREATE INDEX "_relac_mercadoria_viagemToviagem_B_index" ON "_relac_mercadoria_viagemToviagem"("B");

-- AddForeignKey
ALTER TABLE "_relac_mercadoria_viagemToviagem" ADD CONSTRAINT "_relac_mercadoria_viagemToviagem_A_fkey" FOREIGN KEY ("A") REFERENCES "relac_mercadoria_viagem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_relac_mercadoria_viagemToviagem" ADD CONSTRAINT "_relac_mercadoria_viagemToviagem_B_fkey" FOREIGN KEY ("B") REFERENCES "viagem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
