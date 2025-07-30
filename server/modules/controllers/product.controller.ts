import { Request, Response } from 'express';
import { getReorderReport, simulateDemandSpike } from "../services/reorder.service"
import { PrismaClient } from '@prisma/client';


const prisma= new PrismaClient()

export const getReorder = async (req: Request, res: Response) => {
  const report = await getReorderReport();
  res.json(report);
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();

    if (products.length === 0) {
      return res.status(404).json({ message: "No product found" });
    }

    return res.status(200).json(products); // ✅ This ends the response properly
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const simulateSpike = async (req: Request, res: Response) => {
  const { productId, multiplier, days } = req.body;
  const result = await simulateDemandSpike(productId, multiplier, days);
  res.json(result);
};