import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';
import User from '../infra/typeorm/entities/User';
import { inject, injectable } from 'tsyringe';

interface Request {
  name: string;
  email: string;
  password: string;
}

@injectable()
export default class CreateUSerService {

  constructor(
    @inject("UsersRepository")
    private repository: IUserRepository
  ) { }

  public async execute({
    name,
    email,
    password
  }: Request): Promise<User> {

    const checkUserExist = await this.repository.findByEmail(email);

    if (checkUserExist)
      throw new AppError("This appointment is already booked")

    const hasPassword = await hash(password, 8)

    const user = await this.repository.create({
      name,
      email,
      password: hasPassword
    })

    return user;
  }

}