-- DropForeignKey
ALTER TABLE "relac_pessoa_cargo" DROP CONSTRAINT "relac_pessoa_cargo_id_pessoa_fkey";

-- AddForeignKey
ALTER TABLE "relac_pessoa_cargo" ADD CONSTRAINT "relac_pessoa_cargo_id_pessoa_fkey" FOREIGN KEY ("id_pessoa") REFERENCES "pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE;
