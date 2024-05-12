-- DropForeignKey
ALTER TABLE "relac_mercadoria_escala" DROP CONSTRAINT "relac_mercadoria_escala_id_cosignatario_fkey";

-- DropForeignKey
ALTER TABLE "relac_mercadoria_escala" DROP CONSTRAINT "relac_mercadoria_escala_id_mercadoria_fkey";

-- DropForeignKey
ALTER TABLE "relac_mercadoria_escala" DROP CONSTRAINT "relac_mercadoria_escala_id_unidade_medida_fkey";

-- AlterTable
ALTER TABLE "relac_mercadoria_escala" ALTER COLUMN "id_mercadoria" DROP NOT NULL,
ALTER COLUMN "quantidade" DROP NOT NULL,
ALTER COLUMN "movimento" DROP NOT NULL,
ALTER COLUMN "valor_frete" DROP NOT NULL,
ALTER COLUMN "id_unidade_medida" DROP NOT NULL,
ALTER COLUMN "id_cosignatario" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "relac_mercadoria_escala" ADD CONSTRAINT "relac_mercadoria_escala_id_unidade_medida_fkey" FOREIGN KEY ("id_unidade_medida") REFERENCES "unidade_de_medida"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relac_mercadoria_escala" ADD CONSTRAINT "relac_mercadoria_escala_id_mercadoria_fkey" FOREIGN KEY ("id_mercadoria") REFERENCES "mercadoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relac_mercadoria_escala" ADD CONSTRAINT "relac_mercadoria_escala_id_cosignatario_fkey" FOREIGN KEY ("id_cosignatario") REFERENCES "pessoa"("id") ON DELETE SET NULL ON UPDATE CASCADE;
