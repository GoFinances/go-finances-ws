import { injectable, inject } from 'tsyringe';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';

interface Request {
  password: string,
  email: string
}

interface Response {
  user: User;
  token: string;
}

@injectable()
export default class AuthUserService {

  constructor(
    @inject("UsersRepository")
    private repository: IUserRepository
  ) { }

  public async execute({
    password, email
  }: Request): Promise<Response> {
    const user = await this.repository.findByEmail(email);

    if (!user)
      throw new AppError("Combinação de e-mail/senha incorreto, por gentileza tente novamente.")

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched)
      throw new AppError("Combinação de e-mail/senha incorreto, por gentileza tente novamente.")

    const { expiresIn, secret } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn
    })

    return {
      user,
      token
    }
  }
}
