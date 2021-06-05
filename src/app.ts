import 'reflect-metadata';

import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';

import routes from '@shared/infra/http/routes';

import '@shared/infra/typeorm';
import '@shared/container';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory))
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(200).json({
      success: false,
      status: err.statusText,
      message: err.message
    })
  }

  return response.status(200).json({
    success: false,
    status: "error",
    message: `Internal server error ---> ${err}`
  })
});


export default app;

