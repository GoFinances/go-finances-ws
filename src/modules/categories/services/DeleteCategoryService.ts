import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

interface Request {
  id: string;
  user_id: string
}

@injectable()
class DeleteCategoryService {
  constructor(
    @inject("CategoryRepository")
    private repository: ICategoriesRepository
  ) { }

  public async execute({ id, user_id }: Request): Promise<void> {
    const category = await this.repository.findById(user_id, id);

    console.log("category", category)
    if (!category)
      throw new AppError("Transação não foi encontrada.")

    await this.repository.remove(category);
  }
}

export default DeleteCategoryService;
