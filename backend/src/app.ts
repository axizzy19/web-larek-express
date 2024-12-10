import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import errorHandler from './middlewares/errorHandler';
import { errorLogger, requestLogger } from './middlewares/logger';
import { PORT, DB_ADDRESS } from './config';

const cors = require('cors');

mongoose.connect(DB_ADDRESS);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use(requestLogger);

app.use(productRoutes);
app.use(orderRoutes);
app.use('*', (_req: Request, _res: Response, next: NextFunction) => {
  const error = new Error('Запрашиваемый ресурс не найден');
  (error as any).status = 404;
  next(error);
});

app.use(errors());

app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening port ${PORT}`);
});
