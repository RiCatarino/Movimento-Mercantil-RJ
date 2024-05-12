-- DropForeignKey
ALTER TABLE "relac_pessoa_cargo" DROP CONSTRAINT "relac_pessoa_cargo_id_cargo_fkey";

-- AddForeignKey
ALTER TABLE "relac_pessoa_cargo" ADD CONSTRAINT "relac_pessoa_cargo_id_cargo_fkey" FOREIGN KEY ("id_cargo") REFERENCES "cargo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
