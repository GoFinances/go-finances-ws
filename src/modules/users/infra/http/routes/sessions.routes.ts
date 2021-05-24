import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const sessionsRouter = Router();
const controller = new SessionsController();

sessionsRouter.post("/", controller.authenticate);
sessionsRouter.get("/", ensureAuthenticated, controller.checkSession);

export default sessionsRouter;
