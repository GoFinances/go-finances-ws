import { Router } from 'express';
import multer = require('multer');
import { getCustomRepository } from 'typeorm';

import uploadConfig from '@config/upload';
import TransactionRepository from '@modules/transactions/infra/typeorm/repositories/TransactionRepository';
import TransactionsController from '@modules/transactions/infra/http/controllers/TransactionController'


const upload = multer(uploadConfig);
const transactionsRouter = Router();
const controller = new TransactionsController();

transactionsRouter.get('/', controller.index);
transactionsRouter.post('/', controller.create);
transactionsRouter.delete('/:id', controller.delete);
transactionsRouter.post('/import', upload.single('file'), controller.import);

export default transactionsRouter;
