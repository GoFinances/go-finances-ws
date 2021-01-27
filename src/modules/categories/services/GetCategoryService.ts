import ICategoriesRepository from '../repositories/ICategoriesRepository';

import { inject, injectable } from 'tsyringe';
import Category from '../infra/typeorm/entities/Category';

interface IRequest {
  user_id: string;
}

@injectable()
class GetTransactionService {

  constructor(
    @inject("CategoryRepository")
    private repository: ICategoriesRepository
  ) { }

  public async execute({ user_id }: IRequest): Promise<Category[] | undefined> {
    var categories = await this.repository.findAll(user_id);
    return categories;
  }
}

export default GetTransactionService;
