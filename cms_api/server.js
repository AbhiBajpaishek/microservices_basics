import express, { json } from 'express';
import { registerService } from './config/consul';
import customerRoutes from './routes/customerRoutes';

const app = express();
const PORT = 3001;

app.use(json());
app.use('/customer', customerRoutes);

registerService('customer-management', 'customer-management-id', PORT);

app.listen(PORT, () => {
  console.log(`Customer Management Service running on port ${PORT}`);
});
