-- CreateTable
CREATE TABLE "public"."LogErrors" (
    "id" TEXT NOT NULL,
    "error" TEXT NOT NULL,
    "info" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "LogErrors_pkey" PRIMARY KEY ("id")
);
