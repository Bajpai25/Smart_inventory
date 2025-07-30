import { Request, Response } from 'express';
import { getReorderReport, simulateDemandSpike } from "../services/reorder.service"

export const getReorder = async (req: Request, res: Response) => {
  const report = await getReorderReport();
  res.json(report);
};

export const simulateSpike = async (req: Request, res: Response) => {
  const { productId, multiplier, days } = req.body;
  const result = await simulateDemandSpike(productId, multiplier, days);
  res.json(result);
};