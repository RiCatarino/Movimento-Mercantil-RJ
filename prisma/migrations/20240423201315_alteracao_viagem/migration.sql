-- DropForeignKey
ALTER TABLE "viagem" DROP CONSTRAINT "viagem_armador_id_fkey";

-- DropForeignKey
ALTER TABLE "viagem" DROP CONSTRAINT "viagem_capitao_id_fkey";

-- DropForeignKey
ALTER TABLE "viagem" DROP CONSTRAINT "viagem_comandante_id_fkey";

-- DropForeignKey
ALTER TABLE "viagem" DROP CONSTRAINT "viagem_id_embarcacao_fkey";

-- DropForeignKey
ALTER TABLE "viagem" DROP CONSTRAINT "viagem_id_porto_destino_fkey";

-- DropForeignKey
ALTER TABLE "viagem" DROP CONSTRAINT "viagem_id_porto_origem_fkey";

-- DropForeignKey
ALTER TABLE "viagem" DROP CONSTRAINT "viagem_mestre_id_fkey";

-- AlterTable
ALTER TABLE "viagem" ALTER COLUMN "id_embarcacao" DROP NOT NULL,
ALTER COLUMN "id_porto_origem" DROP NOT NULL,
ALTER COLUMN "id_porto_destino" DROP NOT NULL,
ALTER COLUMN "data_viagem" DROP NOT NULL,
ALTER COLUMN "dias_porto_destino" DROP NOT NULL,
ALTER COLUMN "dias_porto_origem" DROP NOT NULL,
ALTER COLUMN "mestre_id" DROP NOT NULL,
ALTER COLUMN "capitao_id" DROP NOT NULL,
ALTER COLUMN "comandante_id" DROP NOT NULL,
ALTER COLUMN "armador_id" DROP NOT NULL,
ALTER COLUMN "tripulacao" DROP NOT NULL,
ALTER COLUMN "total_passageiros" DROP NOT NULL,
ALTER COLUMN "data_chegada" DROP NOT NULL,
ALTER COLUMN "data_rio" DROP NOT NULL,
ALTER COLUMN "dias_viagem" DROP NOT NULL,
ALTER COLUMN "entrada_sahida" DROP NOT NULL,
ALTER COLUMN "observacoes" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "viagem" ADD CONSTRAINT "viagem_id_embarcacao_fkey" FOREIGN KEY ("id_embarcacao") REFERENCES "embarcacao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "viagem" ADD CONSTRAINT "viagem_id_porto_origem_fkey" FOREIGN KEY ("id_porto_origem") REFERENCES "porto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "viagem" ADD CONSTRAINT "viagem_id_porto_destino_fkey" FOREIGN KEY ("id_porto_destino") REFERENCES "porto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "viagem" ADD CONSTRAINT "viagem_mestre_id_fkey" FOREIGN KEY ("mestre_id") REFERENCES "pessoa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "viagem" ADD CONSTRAINT "viagem_capitao_id_fkey" FOREIGN KEY ("capitao_id") REFERENCES "pessoa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "viagem" ADD CONSTRAINT "viagem_comandante_id_fkey" FOREIGN KEY ("comandante_id") REFERENCES "pessoa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "viagem" ADD CONSTRAINT "viagem_armador_id_fkey" FOREIGN KEY ("armador_id") REFERENCES "pessoa"("id") ON DELETE SET NULL ON UPDATE CASCADE;
