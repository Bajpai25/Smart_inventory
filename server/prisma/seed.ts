import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {

  await prisma.product.deleteMany(); 

  await prisma.product.createMany({
    data: [
    
      {
        name: "HDMI Cable",
        stockLevel: 2,
        avgDailySales: 1,
        supplierLeadTime: 4,
        minReorderQty: 10,
        costPerUnit: 3,
        criticality: "high",
        incomingOrderQty: 0,
      },

    
      {
        name: "Mechanical Keyboard",
        stockLevel: 15,
        avgDailySales: 2,
        supplierLeadTime: 5,
        minReorderQty: 20,
        costPerUnit: 45,
        criticality: "medium",
        incomingOrderQty: 0,
      },

      
      {
        name: "USB Hub",
        stockLevel: 100,
        avgDailySales: 1,
        supplierLeadTime: 5,
        minReorderQty: 10,
        costPerUnit: 8,
        criticality: "low",
        incomingOrderQty: 0,
      },

      
      {
        name: "4K Monitor",
        stockLevel: 30,
        avgDailySales: 5,
        supplierLeadTime: 7,
        minReorderQty: 10,
        costPerUnit: 300,
        criticality: "high",
        incomingOrderQty: 0,
      },

    
      {
        name: "Stylus Pen",
        stockLevel: 5,
        avgDailySales: 0.3,
        supplierLeadTime: 6,
        minReorderQty: 5,
        costPerUnit: 12,
        criticality: "medium",
        incomingOrderQty: 0,
      },

      {
        name: "Laptop Stand",
        stockLevel: 20,
        avgDailySales: 0.1,
        supplierLeadTime: 4,
        minReorderQty: 10,
        costPerUnit: 30,
        criticality: "medium",
        incomingOrderQty: 0,
      },


      {
        name: "Webcam",
        stockLevel: 10,
        avgDailySales: 1,
        supplierLeadTime: 4,
        minReorderQty: 5,
        costPerUnit: 50,
        criticality: "high",
        incomingOrderQty: 30,
      },


      {
        name: "Graphics Card",
        stockLevel: 3,
        avgDailySales: 0.2,
        supplierLeadTime: 10,
        minReorderQty: 2,
        costPerUnit: 800,
        criticality: "high",
        incomingOrderQty: 0,
      },

     
      {
        name: "Obsolete Adapter",
        stockLevel: 50,
        avgDailySales: 0,
        supplierLeadTime: 5,
        minReorderQty: 5,
        costPerUnit: 5,
        criticality: "low",
        incomingOrderQty: 0,
      },

    
      {
        name: "Portable SSD",
        stockLevel: 200,
        avgDailySales: 1,
        supplierLeadTime: 6,
        minReorderQty: 20,
        costPerUnit: 90,
        criticality: "medium",
        incomingOrderQty: 0,
      },
    ],
  });

  console.log("Seed complete.");
}

main()
  .catch((err) => {
    console.error("Seed Error", err);
  })
  .finally(() => prisma.$disconnect());
