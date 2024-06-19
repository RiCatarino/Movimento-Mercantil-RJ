-- AlterTable
ALTER TABLE "escala" ADD COLUMN     "observacoes" VARCHAR;

-- AlterTable
ALTER TABLE "pessoa" ADD COLUMN     "id_pessoa" SMALLINT;

-- CreateTable
CREATE TABLE "minibiografia" (
    "id" SERIAL NOT NULL,
    "id_pessoa" INTEGER,
    "biografia" VARCHAR,

    CONSTRAINT "minibiografia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipo_passageiro" (
    "id" SERIAL NOT NULL,
    "tipo" VARCHAR NOT NULL,

    CONSTRAINT "tipo_passageiro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "passageiro" (
    "id" SERIAL NOT NULL,
    "id_tipo_passageiro" SMALLINT,
    "id_pessoa" SMALLINT,
    "total" SMALLINT,
    "observacoes" VARCHAR,

    CONSTRAINT "passageiro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "arriba" (
    "id" SERIAL NOT NULL,
    "id_escala" SMALLINT,
    "observacoes" VARCHAR,

    CONSTRAINT "arriba_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "minibiografia" ADD CONSTRAINT "minibiografia_id_pessoa_fkey" FOREIGN KEY ("id_pessoa") REFERENCES "pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arriba" ADD CONSTRAINT "arriba_id_escala_fkey" FOREIGN KEY ("id_escala") REFERENCES "escala"("id") ON DELETE CASCADE ON UPDATE CASCADE;
