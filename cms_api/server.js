import {} from 'dotenv/config';
import express, { json } from 'express';
import { registerService } from './src/config/consul.js';
import customerRoutes from './src/routes/customerRoutes.js';
import { errorHandler } from './src/middlewares/errorHandler.js';

const app = express();
const PORT = process.env.CUSTOMER_SERVICE_PORT || 3001;

app.use(json());
app.use('/', customerRoutes);
app.use(errorHandler);

registerService('customer-management', 'customer-management-id', PORT);

app.listen(PORT, () => {
  console.log(`Customer Management Service running on port ${PORT}`);
});
