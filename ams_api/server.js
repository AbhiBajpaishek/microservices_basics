import express, { json } from 'express';
import accountRoutes from './routes/accountRoutes';
import { registerService } from './config/consul';

const app = express();
const PORT = 3002;

app.use(json());
app.use('/account', accountRoutes);

registerService('account-management', 'account-management-id', PORT);

app.listen(PORT, () => {
  console.log(`Account Management Service running on port ${PORT}`);
});
