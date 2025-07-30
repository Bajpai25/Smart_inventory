import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from "../routes/product.routes";
import orderRoutes from '../routes/order.routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', productRoutes);
app.use("/api", orderRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});