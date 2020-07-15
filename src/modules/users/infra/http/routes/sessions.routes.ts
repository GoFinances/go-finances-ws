import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();
const controller = new SessionsController();


sessionsRouter.post("/", controller.authenticate);

export default sessionsRouter;