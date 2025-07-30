import { Router } from 'express';
import { getProducts, getReorder, simulateSpike } from '../controllers/product.controller';

const router = Router();

router.get('/reorder-report', getReorder);
router.post('/simulate-spike', simulateSpike);
router.get("/products" , getProducts)

export default router;