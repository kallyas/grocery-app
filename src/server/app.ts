import express, { Application } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';

import userRouter from './Routes/user.route.js';
import * as middlewares from './middlewares.js';

const app: Application = express();

app.use(morgan('common'));
app.use(helmet());
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, authorization'
  );
  next();
});

app.use('/api/v1/', userRouter);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;