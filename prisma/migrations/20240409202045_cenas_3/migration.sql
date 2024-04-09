-- DropForeignKey
ALTER TABLE "porto" DROP CONSTRAINT "porto_id_pais_fkey";

-- AlterTable
ALTER TABLE "porto" ALTER COLUMN "id_pais" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "porto" ADD CONSTRAINT "porto_id_pais_fkey" FOREIGN KEY ("id_pais") REFERENCES "pais"("id") ON DELETE SET NULL ON UPDATE CASCADE;
