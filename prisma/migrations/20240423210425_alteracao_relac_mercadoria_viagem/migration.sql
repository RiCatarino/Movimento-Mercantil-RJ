-- DropForeignKey
ALTER TABLE "relac_mercadoria_viagem" DROP CONSTRAINT "relac_mercadoria_viagem_id_cosignatario_fkey";

-- AlterTable
ALTER TABLE "relac_mercadoria_viagem" ALTER COLUMN "id_cosignatario" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "relac_mercadoria_viagem" ADD CONSTRAINT "relac_mercadoria_viagem_id_cosignatario_fkey" FOREIGN KEY ("id_cosignatario") REFERENCES "pessoa"("id") ON DELETE SET NULL ON UPDATE CASCADE;
