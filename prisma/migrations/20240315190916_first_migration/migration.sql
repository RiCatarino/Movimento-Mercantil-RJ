-- CreateTable
CREATE TABLE "cargo" (
    "id" SERIAL NOT NULL,
    "cargo" VARCHAR(30) NOT NULL,

    CONSTRAINT "cargo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "relac_pessoa_cargo" (
    "id" SERIAL NOT NULL,
    "id_cargo" SMALLINT NOT NULL,
    "id_pessoa" INTEGER NOT NULL,
    "data_cargo" TIMESTAMP(3) NOT NULL,
    "ano" SMALLINT NOT NULL,

    CONSTRAINT "relac_pessoa_cargo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pessoa" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(60) NOT NULL,
    "id_pais" SMALLINT NOT NULL,
    "id_titulo_nobreza" SMALLINT NOT NULL,

    CONSTRAINT "pessoa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "embarcacao" (
    "id" SERIAL NOT NULL,
    "id_tipo_embarcacao" SMALLINT NOT NULL,
    "nome" VARCHAR(30) NOT NULL,
    "observacao" TEXT NOT NULL,

    CONSTRAINT "embarcacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipo_embarcacao" (
    "id" SERIAL NOT NULL,
    "texto_descritivo" TEXT NOT NULL,
    "tipo" VARCHAR(20) NOT NULL,

    CONSTRAINT "tipo_embarcacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "imagem_embarcacao" (
    "id" SERIAL NOT NULL,
    "imagem" VARCHAR(150) NOT NULL,
    "id_tipo_embarcacao" SMALLINT NOT NULL,

    CONSTRAINT "imagem_embarcacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "porto" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(30) NOT NULL,
    "id_pais" SMALLINT NOT NULL,

    CONSTRAINT "porto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pais" (
    "id" SERIAL NOT NULL,
    "pais" VARCHAR(30) NOT NULL,
    "gentilico" VARCHAR(40) NOT NULL,

    CONSTRAINT "pais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "titulo_nobreza" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(20) NOT NULL,

    CONSTRAINT "titulo_nobreza_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "relac_embarcacao_proprietario" (
    "id" SERIAL NOT NULL,
    "id_embarcacao" INTEGER NOT NULL,
    "id_proprietario" INTEGER NOT NULL,
    "data_inicio" TIMESTAMP(3) NOT NULL,
    "data_fim" TIMESTAMP(3) NOT NULL,
    "id_pais" SMALLINT NOT NULL,

    CONSTRAINT "relac_embarcacao_proprietario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "viagem" (
    "id" SERIAL NOT NULL,
    "id_embarcacao" INTEGER NOT NULL,
    "id_porto_origem" SMALLINT NOT NULL,
    "id_porto_destino" SMALLINT NOT NULL,
    "data_viagem" TIMESTAMP(3) NOT NULL,
    "dias_porto_destino" SMALLINT NOT NULL,
    "dias_porto_origem" SMALLINT NOT NULL,
    "mestre_id" INTEGER NOT NULL,
    "capitao_id" INTEGER NOT NULL,
    "comandante_id" INTEGER NOT NULL,
    "armador_id" INTEGER NOT NULL,
    "tripulacao" SMALLINT NOT NULL,
    "total_passageiros" SMALLINT NOT NULL,

    CONSTRAINT "viagem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "escala" (
    "id" SERIAL NOT NULL,
    "id_viagem" SMALLINT NOT NULL,
    "id_porto" SMALLINT NOT NULL,
    "data_escala" TIMESTAMP(3) NOT NULL,
    "ano" SMALLINT NOT NULL,
    "dias_porto" SMALLINT NOT NULL,
    "entrada_de_passageiros" SMALLINT NOT NULL,
    "saida_de_passageiros" SMALLINT NOT NULL,

    CONSTRAINT "escala_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mercadoria" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(40) NOT NULL,

    CONSTRAINT "mercadoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unidade_de_medida" (
    "id" SERIAL NOT NULL,
    "unidade_medida" VARCHAR(15) NOT NULL,

    CONSTRAINT "unidade_de_medida_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "noticia" (
    "id" SERIAL NOT NULL,
    "id_viagem" SMALLINT NOT NULL,
    "assunto" TEXT NOT NULL,

    CONSTRAINT "noticia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "relac_viagem_referencia_doc" (
    "id" SERIAL NOT NULL,
    "id_referencia_documental" INTEGER NOT NULL,
    "id_viagem" SMALLINT NOT NULL,
    "data_publicacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "relac_viagem_referencia_doc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "referencia_documental" (
    "id" SERIAL NOT NULL,
    "nome_periodico" VARCHAR(50) NOT NULL,

    CONSTRAINT "referencia_documental_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "relac_mercadoria_escala" (
    "id" SERIAL NOT NULL,
    "id_escala" SMALLINT NOT NULL,
    "id_mercadoria" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "movimento" TEXT NOT NULL,
    "cosignatario" INTEGER NOT NULL,
    "valor_frete" INTEGER NOT NULL,
    "id_unidade_medida" SMALLINT NOT NULL,

    CONSTRAINT "relac_mercadoria_escala_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "relac_mercadoria_viagem" (
    "id" SERIAL NOT NULL,
    "id_viagem" SMALLINT NOT NULL,
    "id_mercadoria" SMALLINT NOT NULL,
    "quantidade_origem" INTEGER NOT NULL,
    "valor_frete" INTEGER NOT NULL,
    "cosignatario" SMALLINT NOT NULL,
    "id_unidade_medida" SMALLINT NOT NULL,

    CONSTRAINT "relac_mercadoria_viagem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_relac_mercadoria_viagemToviagem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_relac_mercadoria_viagemToviagem_AB_unique" ON "_relac_mercadoria_viagemToviagem"("A", "B");

-- CreateIndex
CREATE INDEX "_relac_mercadoria_viagemToviagem_B_index" ON "_relac_mercadoria_viagemToviagem"("B");

-- AddForeignKey
ALTER TABLE "relac_pessoa_cargo" ADD CONSTRAINT "relac_pessoa_cargo_id_cargo_fkey" FOREIGN KEY ("id_cargo") REFERENCES "cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relac_pessoa_cargo" ADD CONSTRAINT "relac_pessoa_cargo_id_pessoa_fkey" FOREIGN KEY ("id_pessoa") REFERENCES "pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoa" ADD CONSTRAINT "pessoa_id_pais_fkey" FOREIGN KEY ("id_pais") REFERENCES "pais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoa" ADD CONSTRAINT "pessoa_id_titulo_nobreza_fkey" FOREIGN KEY ("id_titulo_nobreza") REFERENCES "titulo_nobreza"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "embarcacao" ADD CONSTRAINT "embarcacao_id_tipo_embarcacao_fkey" FOREIGN KEY ("id_tipo_embarcacao") REFERENCES "tipo_embarcacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "imagem_embarcacao" ADD CONSTRAINT "imagem_embarcacao_id_tipo_embarcacao_fkey" FOREIGN KEY ("id_tipo_embarcacao") REFERENCES "tipo_embarcacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "porto" ADD CONSTRAINT "porto_id_pais_fkey" FOREIGN KEY ("id_pais") REFERENCES "pais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relac_embarcacao_proprietario" ADD CONSTRAINT "relac_embarcacao_proprietario_id_embarcacao_fkey" FOREIGN KEY ("id_embarcacao") REFERENCES "embarcacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relac_embarcacao_proprietario" ADD CONSTRAINT "relac_embarcacao_proprietario_id_pais_fkey" FOREIGN KEY ("id_pais") REFERENCES "pais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relac_embarcacao_proprietario" ADD CONSTRAINT "relac_embarcacao_proprietario_id_proprietario_fkey" FOREIGN KEY ("id_proprietario") REFERENCES "pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "viagem" ADD CONSTRAINT "viagem_id_embarcacao_fkey" FOREIGN KEY ("id_embarcacao") REFERENCES "embarcacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "viagem" ADD CONSTRAINT "viagem_id_porto_origem_fkey" FOREIGN KEY ("id_porto_origem") REFERENCES "porto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "viagem" ADD CONSTRAINT "viagem_mestre_id_fkey" FOREIGN KEY ("mestre_id") REFERENCES "pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "viagem" ADD CONSTRAINT "viagem_capitao_id_fkey" FOREIGN KEY ("capitao_id") REFERENCES "pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "viagem" ADD CONSTRAINT "viagem_comandante_id_fkey" FOREIGN KEY ("comandante_id") REFERENCES "pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "viagem" ADD CONSTRAINT "viagem_armador_id_fkey" FOREIGN KEY ("armador_id") REFERENCES "pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "escala" ADD CONSTRAINT "escala_id_porto_fkey" FOREIGN KEY ("id_porto") REFERENCES "porto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "escala" ADD CONSTRAINT "escala_id_viagem_fkey" FOREIGN KEY ("id_viagem") REFERENCES "viagem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "noticia" ADD CONSTRAINT "noticia_id_viagem_fkey" FOREIGN KEY ("id_viagem") REFERENCES "viagem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relac_viagem_referencia_doc" ADD CONSTRAINT "relac_viagem_referencia_doc_id_referencia_documental_fkey" FOREIGN KEY ("id_referencia_documental") REFERENCES "referencia_documental"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relac_viagem_referencia_doc" ADD CONSTRAINT "relac_viagem_referencia_doc_id_viagem_fkey" FOREIGN KEY ("id_viagem") REFERENCES "viagem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relac_mercadoria_escala" ADD CONSTRAINT "relac_mercadoria_escala_id_unidade_medida_fkey" FOREIGN KEY ("id_unidade_medida") REFERENCES "unidade_de_medida"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relac_mercadoria_escala" ADD CONSTRAINT "relac_mercadoria_escala_id_mercadoria_fkey" FOREIGN KEY ("id_mercadoria") REFERENCES "mercadoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relac_mercadoria_escala" ADD CONSTRAINT "relac_mercadoria_escala_id_escala_fkey" FOREIGN KEY ("id_escala") REFERENCES "escala"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relac_mercadoria_viagem" ADD CONSTRAINT "relac_mercadoria_viagem_id_mercadoria_fkey" FOREIGN KEY ("id_mercadoria") REFERENCES "mercadoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relac_mercadoria_viagem" ADD CONSTRAINT "relac_mercadoria_viagem_id_unidade_medida_fkey" FOREIGN KEY ("id_unidade_medida") REFERENCES "unidade_de_medida"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relac_mercadoria_viagem" ADD CONSTRAINT "relac_mercadoria_viagem_cosignatario_fkey" FOREIGN KEY ("cosignatario") REFERENCES "pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_relac_mercadoria_viagemToviagem" ADD CONSTRAINT "_relac_mercadoria_viagemToviagem_A_fkey" FOREIGN KEY ("A") REFERENCES "relac_mercadoria_viagem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_relac_mercadoria_viagemToviagem" ADD CONSTRAINT "_relac_mercadoria_viagemToviagem_B_fkey" FOREIGN KEY ("B") REFERENCES "viagem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
