import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import errorHandler from './middlewares/errorHandler';
import { errorLogger, requestLogger } from './middlewares/logger';
import { PORT } from './config';

const cors = require('cors');

mongoose.connect('mongodb://127.0.0.1:27017/weblarek');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // теперь клиент имеет доступ только к публичным файлам

// mongoose.connect('mongodb://127.0.0.1:27017/weblarek');

app.use(cors());

app.use(requestLogger);

app.use(productRoutes);
app.use(orderRoutes);

app.use(errors());

app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening port ${PORT}`);
});
