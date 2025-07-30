import { Router } from 'express';
import { getReorder, simulateSpike } from '../controllers/product.controller';

const router = Router();

router.get('/reorder-report', getReorder);
router.post('/simulate-spike', simulateSpike);

export default router;