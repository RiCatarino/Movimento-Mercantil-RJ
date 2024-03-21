-- DropForeignKey
ALTER TABLE "pessoa" DROP CONSTRAINT "pessoa_id_pais_fkey";

-- DropForeignKey
ALTER TABLE "pessoa" DROP CONSTRAINT "pessoa_id_titulo_nobreza_fkey";

-- AlterTable
ALTER TABLE "pessoa" ALTER COLUMN "id_pais" DROP NOT NULL,
ALTER COLUMN "id_titulo_nobreza" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "pessoa" ADD CONSTRAINT "pessoa_id_pais_fkey" FOREIGN KEY ("id_pais") REFERENCES "pais"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoa" ADD CONSTRAINT "pessoa_id_titulo_nobreza_fkey" FOREIGN KEY ("id_titulo_nobreza") REFERENCES "titulo_nobreza"("id") ON DELETE SET NULL ON UPDATE CASCADE;
