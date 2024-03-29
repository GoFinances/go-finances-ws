/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { RefreshTokenController } from '@modules/users/services/RefreshTokenController';
import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();

const controller = new SessionsController();
const refreshTokenController = new RefreshTokenController();

sessionsRouter.post('/', controller.authenticate);
sessionsRouter.post('/refresh-token', refreshTokenController.handle);

export default sessionsRouter;
