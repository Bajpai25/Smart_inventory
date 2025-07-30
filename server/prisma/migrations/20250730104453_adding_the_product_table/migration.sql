-- CreateTable
CREATE TABLE "public"."Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "stockLevel" INTEGER NOT NULL,
    "avgDailySales" DOUBLE PRECISION NOT NULL,
    "supplierLeadTime" INTEGER NOT NULL,
    "minReorderQty" INTEGER NOT NULL,
    "costPerUnit" DOUBLE PRECISION NOT NULL,
    "criticality" TEXT NOT NULL,
    "incomingOrderQty" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
