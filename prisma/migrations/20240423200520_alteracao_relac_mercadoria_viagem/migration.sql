-- DropForeignKey
ALTER TABLE "relac_mercadoria_viagem" DROP CONSTRAINT "relac_mercadoria_viagem_id_unidade_medida_fkey";

-- AlterTable
ALTER TABLE "relac_mercadoria_viagem" ALTER COLUMN "id_unidade_medida" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "relac_mercadoria_viagem" ADD CONSTRAINT "relac_mercadoria_viagem_id_unidade_medida_fkey" FOREIGN KEY ("id_unidade_medida") REFERENCES "unidade_de_medida"("id") ON DELETE SET NULL ON UPDATE CASCADE;
