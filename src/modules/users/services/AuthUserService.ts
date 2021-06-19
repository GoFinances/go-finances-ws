import { injectable, inject } from 'tsyringe';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';
import { IUsersTokensRepository } from '../repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

interface Request {
  password: string,
  email: string
}

interface Response {
  user: User;
  token: string;
  refresh_token: string;
}


@injectable()
export default class AuthUserService {

  constructor(
    @inject("UsersRepository")
    private repository: IUserRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
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

    const {
      expires_in_token,
      secret_refresh_token,
      secret,
      expires_in_refresh_token,
      expires_refresh_token_days,
    } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    });

    const refresh_token_expires_date = this.dateProvider.addDays(
      expires_refresh_token_days
    );

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: refresh_token_expires_date,
    });

    return {
      token,
      refresh_token,
      user
    }
  }
}
