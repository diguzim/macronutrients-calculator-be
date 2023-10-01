-- CreateTable
CREATE TABLE "RawIngredient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "protein_ratio" DOUBLE PRECISION NOT NULL,
    "fat_ratio" DOUBLE PRECISION NOT NULL,
    "carbohidrate_ratio" DOUBLE PRECISION NOT NULL,
    "fiber_ratio" DOUBLE PRECISION NOT NULL,
    "kcal_per_gram" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "RawIngredient_pkey" PRIMARY KEY ("id")
);
