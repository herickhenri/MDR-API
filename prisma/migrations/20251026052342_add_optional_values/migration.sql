-- AlterTable
ALTER TABLE "public"."Mdr" ALTER COLUMN "partesInteressadas" DROP NOT NULL,
ALTER COLUMN "responsavel" DROP NOT NULL,
ALTER COLUMN "editores" DROP NOT NULL,
ALTER COLUMN "linkAprovacao" DROP NOT NULL;
