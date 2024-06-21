-- CreateTable
CREATE TABLE "RawIngredient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "proteinRatio" DOUBLE PRECISION NOT NULL,
    "fatRatio" DOUBLE PRECISION NOT NULL,
    "carbohidrateRatio" DOUBLE PRECISION NOT NULL,
    "fiberRatio" DOUBLE PRECISION NOT NULL,
    "kcalPerGram" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "RawIngredient_pkey" PRIMARY KEY ("id")
);
