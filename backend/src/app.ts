import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import router from './routes/index';
import path from 'path';
import errorHandler from './middlewares/errorHandler';
import { errors } from 'celebrate';
import { requestLogger, errorLogger } from './middlewares/logger';

const { PORT = 3000, DB_ADDRESS } = process.env;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use('/', router);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

mongoose.connect(DB_ADDRESS!)
  .then(() => {
    app.listen(PORT, () => { console.log('listening on port 3000') });
  });
