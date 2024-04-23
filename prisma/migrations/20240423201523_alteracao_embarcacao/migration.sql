-- DropForeignKey
ALTER TABLE "embarcacao" DROP CONSTRAINT "embarcacao_id_tipo_embarcacao_fkey";

-- AlterTable
ALTER TABLE "embarcacao" ALTER COLUMN "id_tipo_embarcacao" DROP NOT NULL,
ALTER COLUMN "nome" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "embarcacao" ADD CONSTRAINT "embarcacao_id_tipo_embarcacao_fkey" FOREIGN KEY ("id_tipo_embarcacao") REFERENCES "tipo_embarcacao"("id") ON DELETE SET NULL ON UPDATE CASCADE;
