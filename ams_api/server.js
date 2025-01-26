import express, { json } from 'express';
import { registerService } from './src/config/consul.js';
import accountRoutes from "./src/routes/accountRoutes.js";
import { errorHandler } from './src/middlewares/errorHandler.js';
import "dotenv/config";

const app = express();
const PORT = process.env.ACCOUNT_SERVICE_PORT || 3002;

app.use(json());
app.use('/', accountRoutes);
app.use(errorHandler);

registerService('account-management', 'account-management-id', PORT);

app.listen(PORT, () => {
  console.log(`Account Management Service running on port ${PORT}`);
});
