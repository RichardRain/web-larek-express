import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import productsRouter from './routes/products';
import orderRouter from './routes/order';
import path from 'path';
import errorHandler from './middlewares/errorHandler';
import { errors } from 'celebrate';

const { PORT = 3000, DB_ADDRESS } = process.env;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(DB_ADDRESS!);

app.use('/product', productsRouter);
app.use('/order', orderRouter);
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => { console.log('listening on port 3000') });