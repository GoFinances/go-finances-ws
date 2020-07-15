import { Router } from 'express';
import multer = require('multer');

import uploadConfig from '@config/upload';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const upload = multer(uploadConfig);
const controller = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.post("/", controller.create);
usersRouter.patch("/avatar", ensureAuthenticated, upload.single('avatar'), userAvatarController.update);

export default usersRouter;