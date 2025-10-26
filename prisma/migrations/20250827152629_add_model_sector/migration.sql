/*
  Warnings:

  - You are about to drop the column `MDRId` on the `Danger` table. All the data in the column will be lost.
  - You are about to drop the `MDR` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Danger" DROP CONSTRAINT "Danger_MDRId_fkey";

-- AlterTable
ALTER TABLE "public"."Danger" DROP COLUMN "MDRId",
ADD COLUMN     "mdrId" TEXT;

-- DropTable
DROP TABLE "public"."MDR";

-- CreateTable
CREATE TABLE "public"."Sector" (
    "unidade" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "processo" TEXT NOT NULL,

    CONSTRAINT "Sector_pkey" PRIMARY KEY ("unidade","area","processo")
);

-- CreateTable
CREATE TABLE "public"."Mdr" (
    "id" TEXT NOT NULL,
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
    "sectorUnidade" TEXT NOT NULL,
    "sectorArea" TEXT NOT NULL,
    "sectorProcesso" TEXT NOT NULL,

    CONSTRAINT "Mdr_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Mdr" ADD CONSTRAINT "Mdr_sectorUnidade_sectorArea_sectorProcesso_fkey" FOREIGN KEY ("sectorUnidade", "sectorArea", "sectorProcesso") REFERENCES "public"."Sector"("unidade", "area", "processo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Danger" ADD CONSTRAINT "Danger_mdrId_fkey" FOREIGN KEY ("mdrId") REFERENCES "public"."Mdr"("id") ON DELETE SET NULL ON UPDATE CASCADE;
