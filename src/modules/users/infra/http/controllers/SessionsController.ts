import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthUserService from '@modules/users/services/AuthUserService';

export default class SessionsController {

  public async authenticate(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authUserService = container.resolve(AuthUserService);

    const { user, token } = await authUserService.execute({ email, password });
    delete user.password;
    return response.json({ success: true, result: { user, token } });
  }
}
