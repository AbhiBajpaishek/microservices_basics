import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use('/customers', createProxyMiddleware({ target: `http://localhost:${process.env.CUSTOMER_SERVICE_PORT}`, changeOrigin: true }));
app.use('/accounts', createProxyMiddleware({ target: `http://localhost:${process.env.ACCOUNT_SERVICE_PORT}`, changeOrigin: true }));

app.listen(process.env.GATEWAY_PORT, () =>
    console.log(`API Gateway running on port ${process.env.GATEWAY_PORT}`)
);
