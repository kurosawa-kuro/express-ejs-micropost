import express from 'express';
import path from 'node:path';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { fileURLToPath } from 'node:url';
import apiRouter from '../src/routes/api/index.js';
import { notFound, errorHandler } from '../src/middlewares/errorHandler.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Global middleware
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'test-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // テスト環境ではfalse
  }),
);

// Routes - API only for testing
app.use('/api', apiRouter);

// 404 & Error
app.use(notFound);
app.use(errorHandler);

export default app;