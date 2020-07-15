import { Router } from 'express';
import multer = require('multer');

import uploadConfig from '@config/upload';
import TransactionsController from '@modules/transactions/infra/http/controllers/TransactionController'
import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated"


const upload = multer(uploadConfig);
const transactionsRouter = Router();
const controller = new TransactionsController();

transactionsRouter.get('/', ensureAuthenticated, controller.index);
transactionsRouter.post('/', ensureAuthenticated, controller.create);
transactionsRouter.delete('/:id', ensureAuthenticated, controller.delete);
transactionsRouter.post('/import', ensureAuthenticated, upload.single('file'), controller.import);

export default transactionsRouter;
