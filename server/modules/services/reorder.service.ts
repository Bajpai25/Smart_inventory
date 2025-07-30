import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

function getDaysOfStockRemaining(stock: number, avgSales: number) {
  return avgSales > 0 ? stock / avgSales : Infinity;
}

function getSafetyStockThreshold(leadTime: number, bufferDays = 5) {
  return leadTime + bufferDays;
}

function getReorderQty(avgSales: number, stock: number, incoming: number, days = 60) {
  const target = avgSales * days;
  return Math.max(0, Math.ceil(target - stock - incoming));
}

export async function getReorderReport() {
  const products = await prisma.product.findMany();


  const processed = products.map((p) => {
    const daysRemaining = getDaysOfStockRemaining(p.stockLevel, p.avgDailySales);
    const safetyThreshold = getSafetyStockThreshold(p.supplierLeadTime);
    const reorderQty = Math.max(p.minReorderQty, getReorderQty(p.avgDailySales, p.stockLevel, p.incomingOrderQty));

    return {
      productId: p.id,
      name: p.name,
      reorderQty,
      estimatedCost: reorderQty * p.costPerUnit,
      criticality: p.criticality,
      daysRemaining,
      safetyThreshold,
      shouldReorder: daysRemaining < safetyThreshold,
    };
  });

  const sorted = processed.sort((a, b) => a.daysRemaining - b.daysRemaining);

 
  const needsReorder = sorted.filter(p => p.shouldReorder);
  return needsReorder.length > 0 ? needsReorder : sorted.slice(0, 3);
}



export async function simulateDemandSpike(productId: string, multiplier: number, days: number) {
  const p = await prisma.product.findUnique({ where: { id: productId } });
  if (!p) throw new Error('Product not found');

  const simulatedSales = p.avgDailySales * multiplier;
  const daysRemaining = p.stockLevel / simulatedSales;
  const reorderQty = getReorderQty(simulatedSales, p.stockLevel, p.incomingOrderQty);

  return {
    productId,
    simulatedSales,
    daysRemaining,
    reorderQty,
    estimatedCost: reorderQty * p.costPerUnit
  };
}
