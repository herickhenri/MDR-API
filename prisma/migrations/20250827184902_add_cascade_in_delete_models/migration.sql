-- DropForeignKey
ALTER TABLE "public"."Danger" DROP CONSTRAINT "Danger_mdrId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Mdr" DROP CONSTRAINT "Mdr_sectorUnidade_sectorArea_sectorProcesso_fkey";

-- DropForeignKey
ALTER TABLE "public"."Risk" DROP CONSTRAINT "Risk_dangerId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Mdr" ADD CONSTRAINT "Mdr_sectorUnidade_sectorArea_sectorProcesso_fkey" FOREIGN KEY ("sectorUnidade", "sectorArea", "sectorProcesso") REFERENCES "public"."Sector"("unidade", "area", "processo") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Danger" ADD CONSTRAINT "Danger_mdrId_fkey" FOREIGN KEY ("mdrId") REFERENCES "public"."Mdr"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Risk" ADD CONSTRAINT "Risk_dangerId_fkey" FOREIGN KEY ("dangerId") REFERENCES "public"."Danger"("id") ON DELETE CASCADE ON UPDATE CASCADE;
