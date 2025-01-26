import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const GATEWAY_PORT = process.env.GATEWAY_PORT || 4000;
const CUSTOMER_SERVICE_PORT = process.env.CUSTOMER_SERVICE_PORT || 3001;
const ACCOUNT_SERVICE_PORT = process.env.ACCOUNT_SERVICE_PORT || 3002;

app.use('/customers', createProxyMiddleware({ target: `http://localhost:${CUSTOMER_SERVICE_PORT}`, changeOrigin: true }));
app.use('/accounts', createProxyMiddleware({ target: `http://localhost:${ACCOUNT_SERVICE_PORT}`, changeOrigin: true }));

app.listen(process.env.GATEWAY_PORT, () =>
    console.log(`API Gateway running on port ${GATEWAY_PORT}`)
);
