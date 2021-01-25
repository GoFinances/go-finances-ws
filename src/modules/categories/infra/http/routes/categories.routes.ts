import { Router } from 'express';

import CategoryController from '@modules/categories/infra/http/controllers/CategoryController'
import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated"


const categoryRouter = Router();
const controller = new CategoryController();

categoryRouter.get('/', ensureAuthenticated, controller.index);
categoryRouter.post('/', ensureAuthenticated, controller.create);
categoryRouter.delete('/:id', ensureAuthenticated, controller.delete);


export default categoryRouter;
