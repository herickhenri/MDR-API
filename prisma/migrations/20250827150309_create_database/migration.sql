-- CreateTable
CREATE TABLE "public"."MDR" (
    "id" TEXT NOT NULL,
    "unidade" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "processo" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "tarefa" TEXT NOT NULL,
    "situacaoOp" TEXT NOT NULL,
    "cargos" TEXT[],
    "GHE" TEXT NOT NULL,
    "crit44Exposicao" TEXT NOT NULL,
    "partesInteressadas" TEXT NOT NULL,
    "responsavel" TEXT NOT NULL,
    "editores" TEXT NOT NULL,
    "aprovadores" TEXT NOT NULL,
    "linkAprovacao" TEXT NOT NULL,

    CONSTRAINT "MDR_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Danger" (
    "id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "MDRId" TEXT,

    CONSTRAINT "Danger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Risk" (
    "id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "crit1Lesao" TEXT[],
    "crit31NaturDoRisc" TEXT NOT NULL,
    "crit41Prob" TEXT NOT NULL,
    "crit42SitControl" TEXT NOT NULL,
    "crit42Concentracao" TEXT NOT NULL,
    "crit4Severidade" TEXT NOT NULL,
    "controlOp" TEXT[],
    "calculo" INTEGER NOT NULL,
    "significanciaRisco" TEXT NOT NULL,
    "dangerId" TEXT,

    CONSTRAINT "Risk_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Danger" ADD CONSTRAINT "Danger_MDRId_fkey" FOREIGN KEY ("MDRId") REFERENCES "public"."MDR"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Risk" ADD CONSTRAINT "Risk_dangerId_fkey" FOREIGN KEY ("dangerId") REFERENCES "public"."Danger"("id") ON DELETE SET NULL ON UPDATE CASCADE;
