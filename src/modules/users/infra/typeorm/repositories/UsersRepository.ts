import { getRepository, Repository } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUserRepository'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'

export default class UsersRepository implements IUsersRepository {

  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.repository.findOne(id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({
      where: { email }
    });
    return user;
  }


  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.repository.create(userData);
    await this.repository.save(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    return this.repository.save(user);
  }
}
