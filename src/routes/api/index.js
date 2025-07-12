import { Router } from 'express';
import api from '../../api.js';
import swaggerRouter from './swagger.js';

const router = Router();

router.use('/docs', swaggerRouter);

router.use((req, res, next) => {
  api.handleRequest(
    {
      method: req.method,
      path: req.path,
      query: req.query,
      body: req.body,
      headers: req.headers,
    },
    req,
    res
  );
});

export default router;